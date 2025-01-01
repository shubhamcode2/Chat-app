import React from 'react'
import OnlyIMG from '../../assets/OnlyIMG.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { userAppStore } from '@/store'


const Auth = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const navigate = useNavigate()
    const { setUserInfo } = userAppStore()

    const validaateSignUp = async () => {
        if (!email.length) {
            toast.error("email is required.");
            return false;
        }
        if (!password.length) {
            toast.error("password is required.");
            return false;
        }
        if (!confirmPassword.length) {
            toast.error("confirm password is required.");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("passwords do not match.")
            return false;
        }
        return true;
    };



    const validateLogin = async () => {
        if (!email.length) {
            toast.error("email is required.");
            return false;
        }
        if (!password.length) {
            toast.error("password is required.");
            return false;
        }
        return true;
    };


    const handleSignUp = async () => {
       try {
         if (validaateSignUp()) {
             //here we will make the api call to signup the user apiclient is the axios instance SIGNUP_ROUTE is the route to signup the user and we are sending the email and password in the body of the request
 
             const response = await apiClient.post(SIGNUP_ROUTE, { email, password },
                 { withCredentials: true }
             );
             
             if (response.status === 201) {
                 setUserInfo(response.data.user)
                 navigate('/profile')
             }
 
         }      
       } catch (error) {
        console.log(error);
        toast.error("Signup failed for some reason.");
        
       }
    }

    const handleLogin = async () => {
       try {
         if (validateLogin()) {
             const response = await apiClient.post(LOGIN_ROUTE, { email, password },
                 { withCredentials: true }
             );
             if (response.data.user.id) {
                 setUserInfo(response.data.user)
                 if (response.data.user.profileSetup) {
                     toast.success("Login successful.");
                     navigate('/chat')
                 } else {
                     toast.success("Login successful.");
                     navigate('/profile')
                 }
             }
 
         }
       } catch (error) {
        console.log(error);
        toast.error("Login failed for some reason.");        
       }

    }



    return (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center'>

            <div className='h-[80vh] w-[80vw] md:w-[50vw] lg:w-[70vw] xl:w-[60vw] 
               bg-white border-2 border-white text-opacity-90 shadow-2xl 
               rounded-3xl '>
                <div className="flex flex-col gap-10 items-center justify-center bg-white ">
                    <div className="flex items-center justify-center flex-col ">
                        <div className="flex items-center justify-center ">
                            <h1 className='text-5xl font-bold md:text-6xl '>welcome</h1>
                            <img src={OnlyIMG} alt="img" className='h-[100px]' />
                        </div>
                        <p className='font-medium text-center'>fill in the details to get started with the best chat app</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>


                        <Tabs defaultValue="login" className='min-w-[400px] '>
                            <TabsList className='flex gap-2 w-full'>
                                <TabsTrigger value="login" className='w-1/2 bg-transparent ' >Login</TabsTrigger>
                                <TabsTrigger value="signup" className='w-1/2 bg-transparent'>SignUp</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className='flex flex-col gap-4 m-5 '>

                                <Input
                                    label='Email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='rounded p-5' />
                                <Input
                                    label='Password'
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='rounded p-5'
                                />
                                <button onClick={handleLogin} className='bg-black text-white rounded p-4'>Login</button>

                            </TabsContent>
                            <TabsContent value="signup" className='flex flex-col gap-4'>

                                <Input
                                    label='Email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='rounded p-5'
                                />
                                <Input
                                    label='Password'
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='rounded p-5'
                                />
                                <Input
                                    label='Confirm Password'
                                    type='password'
                                    placeholder='Confirm your password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='rounded p-5'
                                />
                                <button onClick={handleSignUp} className='bg-black text-white rounded p-4 '>SignUp</button>



                            </TabsContent>
                        </Tabs>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth