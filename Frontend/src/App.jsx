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
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppStore()
  const isAuthenticated = !!userInfo // if userInfo is present then isAuthenticated will be true and !! is used to convert the value to boolean basically its for truthy or falsy values
  return isAuthenticated ? <Navigate to="/chat" /> : children
}


const App = () => {
  const { userInfo, setUserInfo } = userAppStore()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {

    const getUserData = async () => {

      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data)
        }
        else {
          setUserInfo(undefined)
        }
        console.log({ response });
      }
      catch (error) {
        setUserInfo(undefined)
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }

  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>
  }

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