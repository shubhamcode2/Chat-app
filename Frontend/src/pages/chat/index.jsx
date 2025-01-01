import { userAppStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ContactContainer from './components/contact-conatainer'
import EmptyChatContainer from './components/empty-chat-container'
import ChatContainer from './components/chat-container'



const Chat = () => {

  const { userInfo } = userAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("please setup a profile to continue")
      navigate('/profile')
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactContainer />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}

    </div>
  )
}

export default Chat