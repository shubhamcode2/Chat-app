import { useSocket } from "@/context/SocketContext.jsx"
import apiClient from "@/lib/api-client"
import { userAppStore } from "@/store"
import { UPLOAD_FILE_ROUTE } from "@/utils/constants"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"




const MessageBar = () => {
  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState('')
  const { selectedChatData, selectedChatType, userInfo } = userAppStore()
  const socket = useSocket()


  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  }

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileURL: undefined,

      })

    } else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        channelId: selectedChatData._id,
        messageType: "text",
        fileURL: undefined,
      })

    }

    setMessage('')
  }


  const handleAttachmentClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleAttachMentChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file)
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, { withCredentials: true })

        if (response.status === 200 && response.data) {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileURL: response.data.filePath,
            })
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              channelId: selectedChatData._id,
              messageType: "file",
              fileURL: response.data.filePath,
            })
          }
        }


      }
      console.log(file);

    } catch (error) {
      console.log(error);

    }

  }


  return (
    <div className='h-[10vh] bg-[transparent] flex items-center justify-center px-8 mb-6  gap-6'>

      <div className="flex bg-[rgb(53,53,56)] rounded-md items-center gap-5 pr-5 md:w-[70%] lg:w-[80%] xl:w-[90%] w-[100%]">

        <input
          type="text"
          className="flex p-5 bg-transparent rounded-md  focus:border-none focus:outline-none md:w-[70%] lg:w-[80%] xl:w-[90%] w-[100%]"
          placeholder='Type a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleAttachmentClick}
          className='text-neutral-400 focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'
        >
          <GrAttachment className='text-2xl text-white' />
        </button>

        <input type="file" className="hidden" ref={fileInputRef} onChange={handleAttachMentChange} />

        <div className="relative">



          <button className='text-neutral-400 focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}>
            <RiEmojiStickerLine className='text-2xl text-white' />
          </button>



        </div>
      </div>
      <div className="absolute right-12 bottom-[130px]" ref={emojiRef}>
        <EmojiPicker
          theme="dark"
          open={emojiPickerOpen}
          onEmojiClick={handleAddEmoji}
          autoFocusSearch={false}
        />
      </div>

      <button
        onClick={handleSendMessage}
        className='bg-[#000000] rounded-md flex items-center justify-center p-5  focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'>
        <IoSend className='text-2xl text-white' />
      </button>


    </div>
  )
}


export default MessageBar










// const handleSendMessage = () => {
//   if (!message.trim()) {
//     console.error("Cannot send an empty message.");
//     return;
//   }

//   if (selectedChatType === 'contact') {
//     socket.emit("sendMessage", {
//       sender: userInfo.id,
//       content: message,
//       recipient: selectedChatData.id,
//       messageType: "text",
//       fileURL: undefined,
//     });
//     console.log("Message sent:", message);
//   } else {
//     console.warn("Unsupported chat type:", selectedChatType);
//   }
// };