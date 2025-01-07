import apiClient from "@/lib/api-client"
import { userAppStore } from "@/store"
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { MdFolderZip } from "react-icons/md"
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaFile } from "react-icons/fa";

const MessageContainer = () => {

    const scrollRef = useRef()
    const { selectedChatData, selectedChatType, userInfo, selectedChatMessages, setSelectedChatMessages } = userAppStore()

    const [showImage, setShowImage] = useState(false);
    const [imageURL, setImageURL] = useState(null);

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


    const checkIfImage = (filePath) => {

        const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
        return imageRegex.test(filePath);
    }




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




    const downloadFile = async (url) => {
        const response = await apiClient.get(`${HOST}/${url}`, {
            responseType: 'blob',
        });
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', url.split("/").pop());
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(urlBlob);
    }





    const renderDMMessages =
        (message) => (
            <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
                {message.messageType === "text" && (
                    <div
                        className={` ${message.sender !== selectedChatData.MessageContainer_id ?
                            " text-[rgb(217,214,218)] border-[rgb(89,53,105)]"
                            : " text-[rgb(229,226,230)] border-[rgb(239,237,240)] "
                            } border inline-block  p-4  my-1 max-w-[50%] break-words  rounded-full `}>
                        {message.content}
                    </div>
                )}

                {
                    message.messageType === "file" && <div
                        className={` ${message.sender !== selectedChatData.MessageContainer_id ?
                            " text-[rgb(217,214,218)] "
                            : " text-[rgb(229,226,230)] "
                            }  inline-block  p-1  my-1 max-w-[50%] break-words  rounded `}>
                        {checkIfImage(message.fileURL)
                            ? <div
                                onClick={() => {
                                    setShowImage(true);
                                    setImageURL(message.fileURL);
                                }}
                                className="cursor-pointer border-2 border-gray-500 ">
                                <img
                                    src={`${HOST}/${message.fileURL}`}
                                    height={200}
                                    width={200}
                                />
                            </div>
                            : <div
                                // onClick={() => window.open(`${HOST}/${message.fileURL}`)}
                                className="cursor-pointer border-2 rounded border-gray-500 flex items-center justify-center gap-4 bg-[rgb(51,51,51)] ">
                                <span className="text-purple-500 text-2xl p-3 ">
                                    {/* <MdFolderZip /> */}
                                    <FaFile />
                                    </span>
                                <span className="text-white p-3 ">{message.fileURL.split("/").pop()}</span>
                                <span
                                    onClick={() => window.open(`${HOST}/${message.fileURL}`)}
                                    // onClick={() => downloadFile(message.fileURL)}
                                    className="text-purple-500 text-2xl p-3 bg-black"><LuDownload /></span>
                            </div>
                        }
                    </div>
                }


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

            {
                showImage &&
                <div
                    className="fixed top-0 left-0 w-[100vw] h-[100vh]  flex items-center justify-center bg-[rgba(22,21,22,0.8)] z-50"
                >
                    <div>
                        <img src={`${HOST}/${imageURL}`} />
                    </div>
                    <div >


                        <button
                            onClick={() => downloadFile(imageURL)}
                            className="absolute top-2 right-[100px] rounded-full bg-black  p-3 text-3xl">
                            <LuDownload  />
                        </button>

                        <button
                            onClick={() =>{ setShowImage(false)
                                setImageURL(null)}
                            }
                            className="absolute top-2 right-[200px] rounded-full bg-black  p-3 text-3xl">
                            <IoClose />
                        </button>



                    </div>
                </div>

            }
        </div>
    )
}

export default MessageContainer