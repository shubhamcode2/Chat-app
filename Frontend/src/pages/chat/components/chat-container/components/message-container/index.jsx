import apiClient from "@/lib/api-client"
import { userAppStore } from "@/store"
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants"
import moment from "moment"
import { useEffect, useRef } from "react"




const MessageContainer = () => {

    const scrollRef = useRef()
    const { selectedChatData, selectedChatType, userInfo, selectedChatMessages, setSelectedChatMessages } = userAppStore()


    useEffect(() => {

        const getMessages = async () => {
            try {
                const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE,
                    { id: selectedChatData._id },
                    { withCredentials: true }
                )

                if (response.data.messages) {
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (error) {

            }
        }
        if (selectedChatData._id) {
            if (selectedChatType === "contact") getMessages();
        }

    }, [selectedChatData,
        selectedChatType,
        setSelectedChatMessages
    ])




    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChatMessages])

    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
                <div key={index}>
                    {showDate &&
                        (<div className="text-center text-gray-500 my-2">
                            {moment(message.timestamp).format("LL")}
                        </div>
                        )}
                    {
                        selectedChatType === "contact" && renderDMMessages(message)
                    }

                </div>
            )
        })
    }

    const renderDMMessages =
        (message) => (
            <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
                {message.messageType === "text" && (
                    <div
                        className={` ${message.sender !== selectedChatData.MessageContainer_id ?
                            "bg-[rgb(43,42,43)] text-[rgb(217,214,218)] border-[rgb(89,53,105)]"
                            : "bg-[#2a2b33] text-[rgb(229,226,230)] border-[rgb(239,237,240)] "
                            } border inline-block  p-4  my-1 max-w-[50%] break-words  rounded-full `}>
                        {message.content}
                    </div>
                )}
                <div className="text-xs text-gray-600">
                    {moment(message.timestamp).fromNow()}
                    {/* {moment(message.timestamp).format("LT")} */}

                </div>
            </div>

        )


    return (
        <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[75vw] w-full'>
            {renderMessages()}
            <div ref={scrollRef} />
        </div>
    )
}

export default MessageContainer