import { getColor } from "@/lib/utils";
import { userAppStore } from "@/store"
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";



const ContactList = ({ contacts, isChannel = false }) => {


  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessages,
  } = userAppStore();



  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel")
    else setSelectedChatType("contact");
    setSelectedChatData(contact)
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };



  return (
    <div className="mt-5">
      {
        contacts.map((contact) => (
          <div
            className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#fffff222]"
              : ""}`}

            onClick={() => handleClick(contact)}
            key={contact._id}>


            <div className="flex gap-5 items-center justify-start text-neutral-100">
              {
                !isChannel && (

                  <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                    {contact.image ? (
                      <AvatarImage
                        src={`${HOST}/${contact.image}`}
                        className='object-cover w-full h-full bg-black'
                        alt="Profile" />
                    ) : (
                      <div
                        className={`uppercase h-10 w-10  text-lg  flex items-center justify-center rounded-full ${getColor(contact.color)} `}>
                        {contact.firstName
                          ? contact.firstName.split("").shift()
                          : contact.email.split("").shift()
                        }
                      </div>
                    )}
                  </Avatar>

                )
              }
              {
                isChannel && <div className="bg-[#fffff222] h-10 w-10 rounded-full items-center flex justify-center">
                  #
                </div>
              }
              {
                isChannel ? <span> {contact.name}</span>  : <span> {contact.firstName} {contact.lastName}</span>
              }

            </div>


          </div>
        ))

      }

    </div>)


}

export default ContactList