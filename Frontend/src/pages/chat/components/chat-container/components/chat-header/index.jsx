import { RiCloseFill } from 'react-icons/ri'

const ChatHeader = () => {
  return (
    <div className='h-[10vh] border-b-2 border-[rgb(51,51,51)] flex items-center justify-between px-20'>
      <div className='flex gap-5 items-center'>
        <div className='flex gap-3 justify-center items-center'></div>
        <div className='flex gap-5 justify-center items-center'>
          <button className='text-neutral-400 focus:border-none focus:outline-none focus:text-neutral-0 duration-300 transitioan-all'>
            <RiCloseFill className='text-3xl'/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader