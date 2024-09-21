  'use client'

  import { doctorSchema } from '@/app/Schema/doctorSchema'
  import { useToast } from '@/components/hooks/use-toast'
  import { Button } from '@/components/ui/button'
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  import { Textarea } from '@/components/ui/textarea'
  import { availableDays, DoctorCategory, genderSel } from '@/constant'
  import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
  import { zodResolver } from '@hookform/resolvers/zod'
  import axios, { AxiosError } from 'axios'
  import { ChevronRight } from 'lucide-react'
  import { User } from 'next-auth'
  import { useSession } from 'next-auth/react'
  import Image from 'next/image'
  import { redirect, useRouter } from 'next/navigation'
  import React, { useState } from 'react'
  import { Controller, useFieldArray, useForm } from 'react-hook-form'
  import * as z from 'zod'

  function DoctorForm(){
    const { toast } = useToast()
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const router = useRouter()
    const [uploadedImage, setUploadedImage] = useState<string | undefined>()
    const [isUploading, setIsUploading] = useState<boolean>(false)
    // console.log(uploadedImage)
    const user = useUser()

    if(user.isSignedIn !== true) {
      redirect('/sign-up') 
    }
  

  
    const form = useForm<z.infer<typeof doctorSchema>>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
          firstName:'',
          lastName:'',
          gender:'',
          email:'',
          address:'',
          qualifications:"",
          profilePicture:"",
          phone:'',
          availability:[{
            days:'',
            startTime:'',
            endTime:''
          }],
          experience:"1", 
          bio:'',
          specialization:'',

        }
      })
      const { setValue  } = form
      const { fields, append, remove } = useFieldArray({
        control:form.control,
        name: "availability",
      });
    

      const onSubmit = async (data: z.infer<typeof doctorSchema>) => {
        setIsSubmit(true);
        try {
          console.log(data); 
          const response = await axios.post('/api/doctors', data);
          console.log("Response:", response.data); 
          toast({
            title: "Success",
            description: response.data.message,
          });
          const doctorId = response.data?.newDoctor?._id;
          router.push(`/doctors/${doctorId}`);
        } catch (error) {
          console.log("Error:", error);
          const axiosError = error as AxiosError;
          let errorMessage: any = axiosError.message;
      
          toast({
            title: "Error",
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          setIsSubmit(false);
        }
      };

      const uploadImage = async (file: File) => {
        const  formData = new FormData()
        formData.append("file", file)

        try {
          const response = await axios.post('/api/image-upload', formData)
          console.log(response)
  
          if(!response.data.success) {
            throw new Error("Failed to Upload Image")
          }
          console.log(response);
          console.log("Image URL", response.data.data)
          setValue("profilePicture", response.data?.data)
          setUploadedImage(response.data?.data);
        } catch (error) {
          console.log(error)
          alert('Failed to Upload Image')
        }
        finally{
          setIsUploading(false);
        }

      }

      const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setIsUploading(true);
          uploadImage(file);
        }
      };


    return (
    <div className='max-w-[1280px] mx-auto lg:px-10 px-5'>
      <div className="bg-white max-w-4xl w-full mt-10 flex items-center gap-3 mx-auto h-full p-4">
      <div className="w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">

      <Form { ...form }>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="md:col-span-2 w-full py-6 px-6 sm:px-16">
        <div className="mb-6">
        <p className="flex items-center gap-1 text-lg"><Image src='/Logo.svg' height={24} width={24} alt="logo" className="inline" /><span className="inline font-bold text-primary text-xl">DoctorNow</span></p>
        
        <p className="lg:text-3xl md:text-2xl text-xl font-bold
          text-primary">Please fill all fields...</p>
        </div>
        <hr/>
        {/* Full Name */}
        <div>
        <div className="space-y-6 pt-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormLabel
                    className="text-gray-800 text-base font-semibold mb-2 block">First Name</FormLabel>
                  <FormControl>
                  <Input type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your first name" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            {/* Last Name  */}
            <div className="space-y-6 pt-5 space-x-3">
              <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormLabel
                    className="text-gray-800 text-base font-semibold mb-2 block">Last Name</FormLabel>
                  <FormControl>
                  <Input type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your last name" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
        </div>

        {/* Email */}
        <div className="space-y-6 pt-5">
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
        {/* Phone */}
        <div className="space-y-6 pt-5">
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

        {/* address */}
        <div className="space-y-6 pt-5">
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

        {/* Gender */}

        <div className="space-y-6 pt-5">
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


          {/* Experience */}
        <div className="space-y-6 pt-5">
            <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="my-1">
                <FormLabel  className="text-gray-800 text-base font-semibold mb-2 block">Experience</FormLabel>
                <FormControl>
                <Input type="number" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter your address"
                {...field}  />
                </FormControl>
                <FormMessage /> 
              </FormItem>
            )}
          />
        </div>

        
        {/* Qualifiction */}
        <div className="space-y-6 pt-5">
        
              <FormField
                  control={form.control}
                  name='qualifications'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                        Qualification
                      </FormLabel>
                      <p> eg: MBBS from Isra University Dubai || PhD from University of Medical in Landon  </p>
                      <FormControl>
                      <Input placeholder="Enter medical history" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />    
        </div>
        {/* Category */}
        <div className="space-y-6 pt-5">
          <FormField
            control={form.control}
            name='specialization'
            render={({ field }) => (
              <FormItem>
              <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                Select Spaciality
              </FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                      <SelectContent>
                        {DoctorCategory.map(({ category,id,imageSrc }) => (
                          <SelectItem key={id} value={category} className='gridr gap-2'>
                                <span className='text-base py-2'> {category}
                                </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    </FormItem>
                    )}/>
        </div>


        <div className="space-y-6 pt-5">
              <p className='text-base font-semibold'>Select days in which your available</p>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-1">
                <div className="flex space-x-2">
                  <Controller
                    name={`availability.${index}.days`}
                    control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                            <SelectContent>
                              {availableDays.map(({ day,id, }) => (
                                <SelectItem key={id} value={day} className='grid gap-2'>
                                   
                                    <span className='text-base py-2'> {day}
                                  </span>
                            </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    )}
                  />

              <Controller
                name={`availability.${index}.startTime`}
                control={form.control}
                render={({ field }) => (
                  <Input type="time" {...field} placeholder="Start Time" />
                )}
              />

              <Controller
                name={`availability.${index}.endTime`}
                control={form.control}
                render={({ field }) => (
                  <Input type="time" {...field} placeholder="End Time" />
                )}
              />

          <Button type="button" onClick={() => remove(index)}className='text-white'>
            Remove
          </Button>
              </div>
            </div>
          ))}

          <Button type="button" onClick={() => append({ days: "", startTime: "", endTime: "" })} className='text-white'>
            Add Availability
          </Button>
        </div>

        <div className='space-y-6 pt-5'>
              <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                        Bio
                      </FormLabel>
                      <FormControl>
                      <Textarea { ...field }  placeholder='Write something about you...'/>
                    </FormControl>
                  </FormItem>
                )}
              />
        </div>

        <div>
            {/* Profile */}
            <div className="space-y-6 pt-5 space-x-3">
            <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem className="my-1">
                    <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                      Upload Profile Picture
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                         onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setIsUploading(true);
                            uploadImage(file);
                            field.onChange(file); 
                          }
                        }} 
                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      />
                    </FormControl>
                    {/* {uploadedImage && (
                      <div className="mt-4">
                        <Image src={uploadedImage} alt="Uploaded" width={100} height={100} className="rounded-md" />
                      </div> // Displays image preview
                    )} */}
                    <FormMessage />
                  </FormItem>
                )}
              />
                {/* <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem className="my-1">
                      <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                        Upload Profile Picture
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                         {...field}
                         onChange={handleFileUpload}
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                        />  
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
        </div>
        </div>  


        <div className="flex justify-between gap-5 !mt-12 px-5 lg:px-10 pb-5">
        <Button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-sm bg-primary hover:bg-primary/90 transition-all ease-in-out duration-300 focus:outline-none text-white" disabled={isSubmit} >
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

  export default DoctorForm