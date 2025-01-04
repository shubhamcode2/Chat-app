import { animationDefaultOptions } from "@/lib/utils"
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
    return (
        <div
            className="flex-1 md:bg-[rgb(39,28,53)] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">

            <Lottie
                isClickToPauseDisabled={true}
                height={400}
                width={400}
                options={animationDefaultOptions}
            />
            <div className="text-opacity-80 text-white flex flex-col gap-5 mt-10 lg:text-4xl transition-all duration-300 ">
                <h3 className=''>
                    Hi <span className="text-purple-800">!👋</span> Welcome to <span className="text-purple-800">FlowTalk </span>Chat App
                </h3>
            </div>

        </div>
    )
}

export default EmptyChatContainer