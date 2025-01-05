import Logoflow1 from '@/assets/FlowTalk1.png'
import ProfileInfo from './components/profile-info'
import NewDm from './components/new-dm'
import { useEffect } from 'react'
import { GET_DM_CONTACTS_ROUTE } from '@/utils/constants'
import apiClient from '@/lib/api-client'
import { userAppStore } from '@/store'
import ContactList from '@/components/ContactList'



const ContactContainer = () => {

    const { setDirectMessagesContacts, directMessagesContacts } = userAppStore()

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
                withCredentials: true,
            })

            if(response.data.contacts){
                // console.log(response.data.contacts);
                setDirectMessagesContacts(response.data.contacts)
                
            }


        }

        getContacts()
    }, [])




    return (

        <div
            className="relative md:w-[35vw] lg:w-[30vw] xl:w-[25vw] bg-[rgb(30,22,42)] border-r-2 border-[rgb(51,51,51)] ">

            <div className="pt-3 w-[200px] pl-10">
                <img src={Logoflow1} alt="logo" />
            </div>

            <div className='my-5'>

                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                    <NewDm />
                </div>
                <div className='max-h-[35vh] overflow-y-auto scrollbar-hidden'>
                    <ContactList contacts={directMessagesContacts} />

                </div>

            </div>
            <div className='my-5'>

                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels" />
                </div>

            </div>

            <ProfileInfo />
        </div >
    )
}


const Title = ({ text }) => {
    return (
        <h6 className='uppercase tracking-widest textneutral-400 pl-10 font-light text-opacity-90 text-sm '>
            {text}
        </h6>
    )

}

export default ContactContainer;