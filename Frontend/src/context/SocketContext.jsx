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
                // console.log("message", message);

                const { selectedChatData, selectedChatType, addMessage, addContactsInDMContactsList } = userAppStore.getState();
                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)) {
                    console.log("message", message);
                    addMessage(message);
                }
                addContactsInDMContactsList(message)
            }

            const handleRecievedChannelMessage = (message) => {
                // console.log("message", message);
                const { selectedChatData, selectedChatType, addMessage , addChannelInChannelList} = userAppStore.getState();
                if (selectedChatType !== undefined && selectedChatData._id === message.channelId) {
                    // console.log("message", message);
                    addMessage(message);
                }
                addChannelInChannelList(message)
            } 

            socket.current.on("recieveMessage", handleRecievedMessage)
            socket.current.on("recieveChannelMessage", handleRecievedChannelMessage)
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

