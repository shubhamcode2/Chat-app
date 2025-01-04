import { userAppStore } from "@/store";
import { createContext, useContext, useEffect, useRef } from "react";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = userAppStore()

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });


            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleRecievedMessage = (message) => {
                console.log("message", message);

                const { selectedChatData, selectedChatType, addMessage } = userAppStore.getState();
                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)) {
                    console.log("message", message);
                    addMessage(message);
                }
            }

            socket.current.on("recieveMessage", handleRecievedMessage)

            return () => {
                socket.current.disconnect();
            }
        }

    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
};


// // import { userAppStore } from "@/store";
// // import { HOST } from "@/utils/constants";
// // import { createContext, useContext, useEffect, useRef, useCallback } from "react";
// // import { io } from "socket.io-client";

// // const SocketContext = createContext(null);

// // export const useSocket = () => {
// //     return useContext(SocketContext);
// // };

// // export const SocketProvider = ({ children }) => {
// //     const socket = useRef(null);
// //     const { userInfo } = userAppStore();

// //     useEffect(() => {
// //         if (userInfo) {
// //             socket.current = io(HOST, {
// //                 withCredentials: true,
// //                 query: { userId: userInfo.id },
// //             });

// //             socket.current.on("connect", () => {
// //                 console.log("Connected to socket server");
// //             });

// //             socket.current.on("disconnect", () => {
// //                 console.log("Disconnected from socket server");
// //             });

// //             const handleReceivedMessage = (message) => {
// //                 console.log("Received message:", message);

// //                 const { selectedChatType, selectedChatData, addMessage } = userAppStore.getState();
// //                 if (
// //                     selectedChatType !== undefined &&
// //                     (selectedChatData.id === message.sender._id ||
// //                         selectedChatData.id === message.recipient._id)
// //                 ) {
// //                     addMessage(message);
// //                 }
// //             };

// //             socket.current.on("receiveMessage", handleReceivedMessage);

// //             return () => {
// //                 socket.current.disconnect();
// //                 socket.current = null; // Reset the socket reference
// //             };
// //         }
// //     }, [userInfo]);

// //     const sendMessage = useCallback((event, data) => {
// //         if (socket.current && socket.current.connected) {
// //             socket.current.emit(event, data);
// //         } else {
// //             console.warn("Socket is not connected. Cannot send message.");
// //         }
// //     }, []);

// //     return (
// //         <SocketContext.Provider value={{ socket: socket.current, sendMessage }}>
// //             {children}
// //         </SocketContext.Provider>
// //     );
// // };
