import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { userAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoLogOut } from "react-icons/io5"
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ProfileInfo = () => {
    const { userInfo, firstName, lastName } = userAppStore()
    const navigate = useNavigate()
    const logOut = async () => { }
    return (
        <div
            className='absolute bottom-0 left-0 w-full flex items-center justify-evenly px-10 h-16 bg-[rgb(27,27,30)] border-t-2 border-[rgb(51,51,51)] '
        >
            <div className='flex gap-3 items-center justify-center '>

                <div className='w-12 h-12 relative '>
                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                        {userInfo.image ? (
                            <AvatarImage
                                src={`${HOST}/${userInfo.image}`}
                                className='object-cover w-full h-full bg-black'
                                alt="Profile" />
                        ) : (
                            <div
                                className={`uppercase h-12 w-12  text-lg  flex items-center justify-center rounded-full ${getColor(userInfo.color)} `}>
                                {userInfo.firstName
                                    ? userInfo.firstName.split("").shift()//split() converts the string into an array of characters and shift() will return the first character
                                    : userInfo.email.split("").shift()
                                }
                            </div>
                        )}
                    </Avatar>
                </div>
            </div>
            <div>

                {
                    userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : userInfo.email
                }
            </div>
            <div className='flex gap-5'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><FiEdit onClick={() => navigate('/profile')}   /></TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><IoLogOut onClick={logOut} /></TooltipTrigger>
                        <TooltipContent>
                            <p>LogOut</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo