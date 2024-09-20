'use client'

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
import { useRouter } from "next/navigation"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { genderSel, identityClo } from "@/constant"
import { useSession } from "next-auth/react"
import { User } from "next-auth"
import { redirect } from "next/navigation"
import { PatientSchema } from "@/app/Schema/patientSchema"
import { ChevronRight } from "lucide-react"
import Stepper from "@/components/Stepper"


function PatientInfo( {searchParams}: { searchParams: {doctorId: string}} ) {

  const doctorId = searchParams.doctorId
  const session = useSession()
  const user:User = session.data?.user as User
  const { toast } = useToast()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const router = useRouter()



  // if(!user) {
  //   toast({
  //     title:"Unauthorized",
  //     description:"Please login first",
  //     variant:"destructive"
  //   })
  //   redirect('/sign-in')
  // }

  if(!doctorId) {
    redirect('/doctors')  
  }
  const form = useForm<z.infer<typeof PatientSchema>>({
      resolver: zodResolver(PatientSchema),
      defaultValues: {
        fullName:'',
        email:'',
        gender:'',
        age:'',
        address:'',
        medicalHistory:'',
        phone:''
      }
    })

  const onSumbit = async (data:z.infer<typeof PatientSchema>) => {
    console.log(data)
      setIsSubmit(true)
      try {
          const response = await axios.post('/api/patients',data)

          if(response.data?.Success === false) {
            toast({
              title:"Success",
              description:response.data.message,
          })
          }
         
          toast({
              title:"Success",
              description:"You will be redirect to appointment form"
          })

         
          const id = response.data.data?._id
          router.push(`/appointment-form?doctorId=${doctorId}&patientId=${id}`)
          setIsSubmit(false)
          
      } catch (error) {
       console.log("Error while patient creating", error)
       const axiosError = error as AxiosError; 
       let errorMessage:any = axiosError

       toast({
         title: "Error",
         description:errorMessage.message,
         variant:'destructive'
       })
       setIsSubmit(false)
      }
  }

  return (
    <div className='max-w-[1280px] mx-auto lg:px-10 px-5'>
      <Stepper step1="doctors" step2="" step3="" />
       <div className="bg-white max-w-4xl w-full mt-10 flex items-center gap-3 mx-auto h-full p-4">
        <div className="w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">

      <Form { ...form }>
        <form onSubmit={form.handleSubmit(onSumbit)} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
          <p className="flex items-center gap-1 text-lg"><Image src='/Logo.svg' height={24} width={24} alt="logo" className="inline" /><span className="inline font-bold text-primary text-xl">DoctorNow</span></p>
          
          <p className="lg:text-3xl md:text-2xl text-xl font-bold
           text-primary">Fill Patient Information</p>
          </div>
          <hr/>
          {/* Full Name */}
          <div className="space-y-6">
          <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="my-1">
              <FormLabel  className="text-gray-800 text-base font-semibold mb-2 block">Full Name </FormLabel>
              <FormControl>
              <Input type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your full name" {...field}  />
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
            <FormItem className="my-1">
              <FormLabel  className="text-gray-800 text-base font-semibold mb-2 block">Email</FormLabel>
              <FormControl>
              <Input type="email" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your email" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
          </div>

          {/* Date of birth */}
        <div className="space-y-6">
          <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="my-1">
              <FormLabel  className="text-gray-800 text-base font-semibold mb-2 block">Date of Birth</FormLabel>
              <FormControl>
              <Input type="date" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your Password" {...field}  />
              </FormControl>
              <FormMessage /> 
            </FormItem>
            )}
          />
        </div>

          {/* Gender */}

          <div className="space-y-6">
          <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-800 text-base font-semibold mb-2 block"> Select your gender.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={ field.value }
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    {
                      genderSel.map(({id, label, value}) => (
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


          <div className="space-y-6">
              <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormLabel  className="text-gray-800 text-base font-semibold mb-2 block">Address</FormLabel>
                  <FormControl>
                  <Input type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your address" {...field}  />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
          <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text" // Use text to control input properly
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter your phone number"
                      {...field}
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        // Allow only numbers, prevent letters or special characters
                        input.value = input.value.replace(/[^0-9]/g, "");
                        field.onChange(input.value); // Sync with form
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        <div className="space-y-3">
        <FormField
              
              control={form.control}
              name='medicalHistory'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                    Medical History
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medical history" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
        </div>
          <div className="!mt-12">
          <Button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-sm bg-primary hover:bg-primary/90 transition-all ease-in-out duration-300 focus:outline-none text-white"  >
          {
              isSubmit ?<> Please wait <Image src='/infinite-spinner.svg' alt="loader" width={40} height={24}/></>:<>Next Step<ChevronRight/></>
          }
          </Button>
          </div>
        </form>
      </Form>
        </div>
      </div>      
    </div>
  )
}

export default PatientInfo