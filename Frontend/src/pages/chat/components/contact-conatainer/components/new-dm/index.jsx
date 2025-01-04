import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions, getColor } from "@/lib/utils"
import apiClient from "@/lib/api-client"
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { userAppStore } from "@/store"


// const NewDm = () => {
//   const [openNewContactModel, setOpenNewContactModel] = useState(false)
//   const [searchedContacts, setSearchedContacts] = useState([])

//   const searchContacts = async (searchTerm) => {
//     try {
//       if (searchTerm.length > 0) {
//         const response = await apiClient
//           .post(SEARCH_CONTACTS_ROUTE,
//             { searchTerm },
//             { withCredentials: true }
//           )

//       if (response.status === 200 && response.data.contacts) {
//         setSearchedContacts(response.data.contacts)
//       } else {
//         setSearchedContacts([])
//       }
//     } }
//     catch (error) {
//       console.log("error", error);

//     }

const NewDm = () => {
  const { setSelectedChatType, setSelectedChatData, selectedChatType } = userAppStore()
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    if (searchTerm.length === 0) {
      setSearchedContacts([]); // Clear results for empty input
      return;
    }

    try {
      const response = await apiClient.post(
        SEARCH_CONTACTS_ROUTE,
        { searchTerm },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.contacts) {
        setSearchedContacts(response.data.contacts);
      } else {
        setSearchedContacts([]); // Clear results if no contacts are found
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
      setSearchedContacts([]); // Clear results on error
    }
  };

  const selectNewContect = async (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
    // console.log(selectedChatType);


  }







  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="cursor-pointer "
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent
            className=""
          >
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="w-[425px] h-[450px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription>

            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search"
              className="w-full"
              onChange={(e) => searchContacts(e.target.value)} />
          </div>



          {
            searchedContacts.length > 0 && (
              <ScrollArea
                className="h-[250px]">
                <div className="flex flex-col gap-5">
                  {searchedContacts.map((contact) => (
                    <div
                      className="flex items-center gap-5 cursor-pointer"
                      key={contact._id}
                      onClick={() => selectNewContect(contact)}
                    >
                      <div className='w-12 h-12 relative '>
                        <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                          {contact.image ? (
                            <AvatarImage
                              src={`${HOST}/${contact.image}`}
                              className='object-cover w-full h-full bg-black'
                              alt="Profile" />
                          ) : (
                            <div
                              className={`uppercase h-12 w-12  text-lg  flex items-center justify-center rounded-full ${getColor(contact.color)} `}>
                              {contact.firstName
                                ? contact.firstName.split("").shift()
                                : contact.email.split("").shift()
                              }
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}
                        </span>
                        <span className="text-xs">{contact.email} </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

            )
          }


          {searchedContacts.length <= 0 &&

            (<div
              className="flex-1 md:bg-transparent md:flex flex-col justify-center items-center  duration-1000 transition-all">

              <Lottie
                isClickToPauseDisabled={true}
                height={300}
                width={300}
                options={animationDefaultOptions}
              />


            </div>)
          }
        </DialogContent>
      </Dialog>


    </>
  )

};








export default NewDm