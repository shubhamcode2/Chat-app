import React, { Children, useEffect } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'
import { userAppStore } from './store'
import apiClient from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoutes = ({ children }) => {
  const { userInfo } = userAppStore()
  const isAuthentiacted = !!userInfo
  return isAuthentiacted ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppStore()
  const isAuthentiacted = !!userInfo
  return isAuthentiacted ? <Navigate to="/auth" /> : children
}
const App = () => {
  const { userInfo, setUserInfo } = userAppStore()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO,{
          withCredentials: true,
        });
        console.log({response});
        
      } catch (error) {
        console.log({error})
        
      }
     }
    if (!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/auth" element={<AuthRoute>
          <Auth />
        </AuthRoute>} />

        <Route path="/profile" element={<PrivateRoutes>
          <Profile />
        </PrivateRoutes>} />

        <Route path="/chat" element={<PrivateRoutes>
          <Chat />
        </PrivateRoutes>} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App