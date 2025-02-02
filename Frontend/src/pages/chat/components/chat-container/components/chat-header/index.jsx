import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { userAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import { RiCloseFill } from 'react-icons/ri'

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = userAppStore()

  return (
    <div className='h-[10vh] border-b-2 border-[rgb(51,51,51)] flex items-center justify-between px-20'>
      <div className='flex gap-5 items-center  w-full justify-between'>
        <div className='flex gap-3 justify-center items-center'>

          <div className='w-12 h-12 relative '>
            {
              selectedChatType === "contact" ? <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    className='object-cover w-full h-full bg-black'
                    alt="Profile" />
                ) : (
                  <div
                    className={`uppercase h-12 w-12  text-lg  flex items-center justify-center rounded-full ${getColor(selectedChatData.color)} `}>
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()
                    }
                  </div>
                )}
              </Avatar> : <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    className='object-cover w-full h-full bg-black'
                    alt="Profile" />
                ) : (
                  <div
                    className={`uppercase h-12 w-12  text-lg  flex items-center justify-center rounded-full ${getColor(selectedChatData.color)} `}>
                    {selectedChatData.name
                      ? selectedChatData.name.split("").shift()
                      : selectedChatData.email.split("").shift()
                    }
                  </div>
                )}
              </Avatar>
            }
           
          </div>

          <div>
            {selectedChatType === "channel" && selectedChatData.name ? selectedChatData.name : ""}
            {selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
          </div>

        </div>
        <div className='flex gap-5 justify-center items-center'>
          <button
            onClick={closeChat}
            className='text-neutral-400 focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'>
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader