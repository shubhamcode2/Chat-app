import Logoflow1 from '@/assets/FlowTalk1.png'
import ProfileInfo from './components/profile-info'
import NewDm from './components/new-dm'



const ContactContainer = () => {
    return (

        <div
            className="relative md:w-[35vw] lg:w-[30vw] xl:w-[25vw] bg-[rgb(30,22,42)] border-r-2 border-[rgb(51,51,51)] ">

            <div className="pt-3 w-[200px] pl-10">
                <img src={Logoflow1} alt="logo" />
            </div>

            <div className='my-5'>

                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                    <NewDm/>
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