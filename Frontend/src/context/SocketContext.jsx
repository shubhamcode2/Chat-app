// import { userAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import React, { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//     return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//     const socket = useRef();
//     const { userInfo } = userAppStore();

//     useEffect(() => {
//         if (userInfo) {
//             // Initialize socket connection
//             socket.current = io(HOST, {
//                 withCredentials: true,
//                 query: { userId: userInfo.id },
//             });

//             // Set up basic event listeners
//             socket.current.on("connect", () => {
//                 console.log("Connected to socket server");
//             });

//             socket.current.on("disconnect", () => {
//                 console.log("Disconnected from socket server");
//             });

//             return () => {
//                 // Cleanup on unmount
//                 socket.current.disconnect();
//             };
//         }
//     }, [userInfo]);

//     useEffect(() => {
//         if (!socket.current) return;

//         const handleRecievedMessage = (message) => {
//             const { selectedChatType, selectedChatData, addMessage } = userAppStore.getState();

//             // Check message relevance
//             if (
//                 selectedChatType !== undefined &&
//                 (selectedChatData.id === message.sender._id ||
//                     selectedChatData.id === message.recipient._id)
//             ) {
//                 console.log("message", message);
//                 addMessage(message);
//             }
//         };
//         // Add message listener
//         socket.current.on("Receive Message", handleRecievedMessage);

//         // Cleanup listener
//         return () => {
//             socket.current.off("Receive Message", handleRecievedMessage);
//         };
//     }, []); // Dependency array is empty as `socket.current` is stable

//     return (
//         <SocketContext.Provider value={socket.current}>
//             {children}
//         </SocketContext.Provider>
//     );
// };





import { userAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
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
            }
            );

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleRecievedMessage = (message) => {
                const { selectedChatType, selectedChatData, addMessage } = userAppStore.getState();
                if (
                    selectedChatType !== undefined &&
                    (selectedChatData.id === message.sender._id ||
                        selectedChatData.id === message.recipient._id)) {
                    console.log("message", message);
                    addMessage(message);
                }
            }

            socket.current.on("Receive Message", handleRecievedMessage)

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