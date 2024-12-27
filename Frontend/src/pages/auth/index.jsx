import React from 'react'
import OnlyIMG from '../../assets/OnlyIMG.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
const Auth = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleLogin = () => {
        console.log 
    }

    const handleSignUp = () => {
        console.log 
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