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
import { animationDefaultOptions } from "@/lib/utils"


const NewDm = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState([])
 const searchContacts = async (searchTerm) => {}





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
            onChange = {(e)=>searchContacts(e.target.value)} />
          </div>


          {searchedContacts.length <= 0 && 

           ( <div
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
}

export default NewDm