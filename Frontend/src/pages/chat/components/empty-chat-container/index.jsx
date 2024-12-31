import { animationDefaultOptions } from "@/lib/utils"
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
  return (
    <div
      className="flex-1 md:bg-[rgb(27,27,51)] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">

      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      Empty chat container
    </div>
  )
}

export default EmptyChatContainer