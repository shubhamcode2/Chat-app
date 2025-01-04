import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessagesModel.js";


const setupSocket = (server) => {
    const io = new SocketIoServer(
        server,
        {
            cors: {
                origin: process.env.ORIGIN,
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`client disconnected ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color");



        if (recipientSocketId) {
            io.to(recipientSocketId).emit("Receive Message", messageData);
        } else {
            console.log("Recipient Socket Id not found");
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("Receive Message", messageData);
        } else {
            console.log("Sender Socket Id not found");
        }
    }



    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected :${userId} with Socket id :${socket.id}`);
        } else {
            console.log("UserId not provided during Connection");
        }

        socket.on('Send Message', sendMessage)
        socket.on("disconnect", () => disconnect(socket))

    });
};

export default setupSocket