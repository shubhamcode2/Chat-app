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

import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import apiClient from "@/lib/api-client"
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE, HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants"
import { userAppStore } from "@/store"
import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multipleSelect"



const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData, selectedChatType, addChannel } = userAppStore()
    const [newChannelModel, setNewChannelModel] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
                withCredentials: true,

            })

            setAllContacts(response.data.contacts)
        }

        getData()
    }, [])

    const createChannel = async () => {
        try {

            if (channelName.length > 0 && selectedContact.length > 0) {

                const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                    name: channelName,
                    members: selectedContact.map((contact) => contact.value),
                }, { 
                    withCredentials: true,
                })

                if (response.status === 201) {
                    setChannelName("")
                    setSelectedContact([])
                    addChannel(response.data.channel)
                }
                setNewChannelModel(false) 
            }
        } catch (error) {
            console.log(error);
        }

    }


    return ( 
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="cursor-pointer "
                            onClick={() => setNewChannelModel(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent
                        className=""
                    >
                        create new channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
                <DialogContent className="w-[425px] h-[450px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>plaese fill up the details for new channel</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Channel Name"
                            className="w-full"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName} />
                    </div>
                    <div>
                        <MultipleSelector
                            className="w-full"
                            options={allContacts}
                            placeholder="serach contacts contacts"
                            value={selectedContact}
                            onChange={setSelectedContact}
                            emptyIndicator={
                                <p className="text-center text-lg leading-6 text-gray-600">No result found</p>
                            }
                        />
                    </div>
                    <div className="">
                        <Button
                            onClick={createChannel}
                            className="w-full"
                        >create channel </Button>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    )

};

export default CreateChannel