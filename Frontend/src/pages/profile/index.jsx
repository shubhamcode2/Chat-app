import { userAppStore } from '@/store'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Profile = () => {
  const { userInfo, setUserInfo } = userAppStore()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {

  }

  

  return (
    <div className='bg-[#000000] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div>

          <IoArrowBack
            className='text-white/90 text-2xl cursor-pointer'
            onClick={() => navigate(-1)}
          />

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div
            className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>



          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile