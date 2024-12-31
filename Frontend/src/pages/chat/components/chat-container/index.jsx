import ChatHeader from './components/chat-header'
import MessageContainer from './components/message-container'
import MessageBar from './components/message-bar'

const
  ChatContainer = () => {
    return (
      <div className='fixed top-0 h-[100vh] w-[100vw] bg-[rgb(38,38,40)] flex flex-col md:static md:flex-1'>
        <ChatHeader/>
        <MessageContainer/>
        <MessageBar/>
      </div>
    )
  }

export default
  ChatContainer