'use client'

import { signUpSchema } from "@/app/Schema/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { useState } from "react"
import axios, { AxiosError } from "axios"
import {useToast } from "@/components/hooks/use-toast"
import { redirect, useRouter } from "next/navigation"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { identityClo } from "@/constant"
import { useSession } from "next-auth/react"
import { User } from "next-auth"

function SignupPage() {

    const session = useSession()
    const user:User = session.data?.user as User
    const router = useRouter()
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          identity:''
        }
      })

    const onSumbit = async (data:z.infer<typeof signUpSchema>) => {
        setIsSubmit(true)
        try {
            const response = await axios.post('/api/sign-up',data)
            const id = response.data?.user?._id

            toast({
                title:"Success",
                description:(await response).data.message
            })
            router.replace(`/verify-code/${id}`);
            setIsSubmit(false)
        } catch (error) {
         console.log("Error while user sign up", error)
         const axiosError = error as AxiosError; 
         let errorMessage:any = axiosError
 
         toast({
           title: "Signup failed",
           description:"Server Error",
           variant:'destructive'
         })
         setIsSubmit(false)
        }
    }

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:10px">

      {/* <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="flex items-center gap-1 text-3xl">Welcome to  <Image src='/Logo.svg' height={24} width={40} alt="logo" className="inline" /><span className="inline font-bold text-primary">DoctorNow</span></h1>
        <p className="text-center pt-5 text-gray-500">We Provide Simple Online Doctor Booking Appointment</p>
      </div> */}


      <div className="bg-white max-w-4xl mt-10 flex items-center gap-3 mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-primary-100 to-primary lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
          </div>

      <Form { ...form }>
        <form onSubmit={form.handleSubmit(onSumbit)} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
          <p className="flex items-center gap-1 text-lg"><Image src='/Logo.svg' height={24} width={40} alt="logo" className="inline" /><span className="inline font-bold text-primary text-3xl">DoctorNow</span></p>
          </div>

          {/* Username  */}
          <div className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-gray-800 text-sm mb-2 block">Username</FormLabel>
              <FormControl>
              <div className="relative flex items-center">
                <Input type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your Username" {...field}  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            {/* <div>
              <FormLabel className="text-gray-800 text-sm mb-2 block">
                Username
              </FormLabel>
            
            </div> */}
          </div>

          {/* Email */}
          <div className="space-y-6">
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-gray-800 text-sm mb-2 block">Email</FormLabel>
              <FormControl>
              <div className="relative flex items-center">
                <Input type="email" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your Email" {...field}  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
          </div>

          {/* Password */}
          <div className="space-y-6">
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel  className="text-gray-800 text-sm mb-2 block">Password</FormLabel>
              <FormControl>
              <div className="relative flex items-center">
                <Input type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your Password" {...field}  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
      </div>

          {/* Idenity */}

          <div className="space-y-6">
          <FormField
          control={form.control}
          name="identity"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am here to...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={ field.value }
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    {
                      identityClo.map(({id, label, value}) => (
                        <FormItem key={id+label} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={ value } />
                        </FormControl>
                        <FormLabel className="font-normal">
                        { label }
                        </FormLabel>
                      </FormItem>
                      ))
                    }
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div className="!mt-12">
          <Button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-sm bg-primary hover:bg-primary/90 transition-all ease-in-out duration-300 focus:outline-none text-white" disabled={isSubmit} >
          {
              isSubmit ?<> Please wait <Image src='/infinite-spinner.svg' alt="loader" width={40} height={24}/></>: ("Create an account") 
          }
          </Button>
          </div>

          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/sign-in" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
        </form>
      </Form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage