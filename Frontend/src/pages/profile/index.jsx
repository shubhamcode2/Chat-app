// import OnlyIMG from '../../assets/OnlyIMG.png'
import { userAppStore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from '@/lib/utils'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants'
import apiClient from '@/lib/api-client'
import { use } from 'react'

const Profile = () => {
  const { userInfo, setUserInfo } = userAppStore()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setSelectedColor(userInfo.color)
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`)
    }

  }, [userInfo])


  const validateProfile = async () => {
    if (!firstName.length || !lastName.length) {
      toast.error("first name and last name are required.");
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE,
          {
            firstName,
            lastName,
            color: colors[selectedColor],
          }, { withCredentials: true });
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data })
          toast.success("Profile updated successfully.");
          navigate('/chat')
        }
      } catch (error) {
        console.log(error);

      }

    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
    console.log(fileInputRef.current);

  };

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);

      const formData = new FormData();
      formData.append("profile-image", file)
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, { withCredentials: true })

      console.log(response);

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image })
        toast.success("Image updated successfully.");
      }
    }

  }

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, { withCredentials: true })
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null })
        toast.success("Image removed successfully.");
        setImage(null);
      }
    } catch (error) {

    }

  }
  // console.log("image ", image);




  return (
    <div className='bg-[#000000] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div>

          <IoArrowBack
            className='text-white/90 text-4xl cursor-pointer hover:bg-fuchsia-600'
            onClick={() => {
              if (userInfo.profileSetup) {
                navigate('/chat')
              } else {
                toast.error("Please setup your profile to continue")
              }
            }}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div
            className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  className='object-cover w-full h-full bg-black'
                  alt="Profile" />
              ) : (
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl  flex items-center justify-center rounded-full ${getColor(selectedColor)} `}>
                  {firstName
                    ? firstName.split("").shift()//split() converts the string into an array of characters and shift() will return the first character
                    : userInfo.email.split("").shift()
                  }
                </div>
              )}
            </Avatar>
            {hovered &&
              (<div
                onClick={image ? handleDeleteImage : handleFileInputClick}
                className='absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer ring-fuchsia-50 rounded-full'
              > {image ? (
                <FaTrash className='text-white text-3xl cursor-pointer' />)
                : (<FaPlus className='text-white text-3xl cursor-pointer' />)}
              </div>
              )
            }
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              onChange={handleImgChange}
              name='profile-image'
              accept='.jpg, .jpeg, .png, .webp, .avif, .gif, .svg, .jfif'
            />
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5  text-white items-center justify-center'>
            <div className='w-full'>


              <Input
                placeholder="email"
                type="email"
                value={userInfo.email}
                disabled
                className="rounded-lg p-6 m-2 bg-[#2e2c2c] text-white border-none outline-none"
              />

              <Input
                placeholder="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 m-2 bg-[#2e2c2c] text-white border-none outline-none"
              />
              <Input
                placeholder="LastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 m-2 bg-[#2e2c2c] text-white border-none outline-none"
              />


            </div>
            <div className='w-full flex gap-5 '>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${color}
                ${selectedColor === index ? "outline outline-2 outline-offset-2 outline-white" : ""}`}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          onClick={saveChanges}
          className='bg-fuchsia-600 hover:bg-fuchsia-500 transition-all duration-300'
        >Save Changes</Button>
      </div>
    </div>
  )
}

export default Profile