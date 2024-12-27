import { userAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Chat = () => {
  const { userInfo } = userAppStore()
  const naviaget = useNavigate()

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("please setup a profile to continue")
      navigate('/profile')
    }
  }, []);
  
  return (
    <div>Chat</div>
  )
}

export default Chat