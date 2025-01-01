import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        messageType: {
            type: String,
            enum: ["TEXT", "IMAGE", "VIDEO", "FILE"],
            required: true
        },
        content: {
            type: String,
            required: function () {
                return this.messageType === "TEXT";
            },
        },
        fileURL: {
            type: String,
            required: function () {
                return this.messageType === "FILE";
            },
        }
    }, {
    timestamps: true
});


const Message = mongoose.model("Message", messageSchema); 

export default Message;