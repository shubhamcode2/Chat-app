import { useSocket } from "@/context/SocketContext"
import { userAppStore } from "@/store"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { GrAttachment, GrFormAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"




const MessageBar = () => {
  const emojiRef = useRef(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState('')
  const { selectedChatData, selectedChatType, userInfo } = userAppStore()
  const socket = useSocket()

  const handleAddEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  }


  const handleSendMessage = async () => {
    if (selectedChatType === 'contact') {
      socket.emit("sendMessage ",
        {
          sender: userInfo.id,
          content: message,
          recipient: selectedChatData.id,
          messageType: "text",
          fileURL: undefined,
        }
      )
    }

  }


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
          className='text-neutral-400 focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'
        >
          <GrAttachment className='text-2xl text-white' />
        </button>

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