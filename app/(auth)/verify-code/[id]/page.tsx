"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image"
import { verifySchema } from "@/app/Schema/verifySchema"
import axios, { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"



export default function InputOTPForm() {
    const router = useRouter()
    const params = useParams<{id:string}>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
        code: "",
        },
    })

 async function onSubmit(data: z.infer<typeof verifySchema>) {

  try {
    setIsSubmit(true)
    console.log(data)
    const id = params.id
    const response = await axios.post(`/api/verify-user?id=${id}`,
        {
            id:id,
            code:data.code
        }
    )
      toast({
        title: "",
        description:response.data?.message
      })

      if(response.data.success) {
        router.push('/')
      }
      setIsSubmit(false)
  } catch (error) {
    const axiosError = error as AxiosError
    console.log("Server side error", error)
    toast({
        title: "Error",
        description: axiosError.message,
        variant:"destructive"
      })
      setIsSubmit(false)
    }
  }

  return (
    <div className="max-w-[1280px] h-screen flex items-center justify-center mx-auto ">
     <div className="bg-primary px-10 py-5 rounded-3xl gap-10  flex flex-col items-center justify-center">
     <p className="bg-white px-5 lg:px-10 py-4 rounded-3xl flex items-center gap-1 text-lg"><Image src='/Logo.svg' height={24} width={40} alt="logo" className="inline" /><span className="inline font-bold text-primary text-3xl">DoctorNow</span></p>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white text-3xl">Verify your account</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription  className="text-gray-300 w-full">
                Please enter the otp sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-white hover:bg-transparent hover:border hover:text-white " disabled={isSubmit}>
        {
              isSubmit ?<><Image src='/infinite-spinner.svg' alt="loader" width={40} height={24}/></>: ("Verify") 
          }
        </Button>
      </form>
    </Form>
     </div>
    </div>
  )
}
