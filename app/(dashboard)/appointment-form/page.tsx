'use client'

import { appointmentSchema } from '@/app/Schema/appointmentSchema';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { CalendarIcon } from 'lucide-react';
import { format, addDays } from "date-fns";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Stepper from '@/components/Stepper';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Doctor } from '@/app/model/Doctor';
import { Label } from '@/components/ui/label';
import Loader from '@/components/Loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [doctor, setDoctor] = useState<Doctor>() 
  const searchParams = useParams()
  const doctorId = searchParams.doctorId
  const id = searchParams.patientId
  const router = useRouter()


  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentDate: new Date(),
      appointmentTime: "",
      note: "",
      status: 'pending',
    }
  });


  useEffect(() => {
    if (!doctorId) return;  
  
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`/api/doctors/${doctorId}`);
        setDoctor(data.doctor);

      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
  
    fetchDoctor();
  }, [doctorId]);

  const onSubmit = async (data: z.infer<typeof appointmentSchema>) => {
    console.log(data)
    try {
      setIsSubmit(true)
      const response = await axios.post(`/api/appointments?patientId=${id}&doctorId=${doctorId}`,data);
      console.log(data)

      if(response.data.success) {
        toast({
          title:"Congratulation",
          description:"Remember on date & time of Appointment"
        })
        router.push(`/doctors/${doctorId}`);
      }


      setIsSubmit(false)
    } catch (error) {

      setIsSubmit(false)
      const axiosError = error as AxiosError;
      toast({
        title: "Error",
        description: axiosError.message,
        variant: 'destructive',
      });
    }
  };


  if(!doctor) {
    <div className='min-h-screen w-screen'>
      <Loader/>
    </div>
  }
  return (
    <div className='max-w-[1280px] mx-auto min-h-screen lg:px-10 px-5'>
       <Stepper step1="doctors" step2="doctors/patient-form" step3="" />

      <div className='bg-white max-w-4xl w-full mt-10 flex items-center gap-3 mx-auto h-full p-4'>
      <div className='w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden'>
      <Form { ...form }>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
          <p className="flex items-center gap-1 text-lg"><Image src='/Logo.svg' height={24} width={24} alt="logo" className="inline" /><span className="inline font-bold text-primary text-xl">DoctorNow</span></p>
          
          <p className="lg:text-3xl md:text-2xl text-xl font-bold
           text-primary">One step away from booking appointment</p>
          </div>
          <hr/>
          
          
          <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-2">
                  {doctor && (
                    <div className="w-full p-4 border border-gray-200 rounded-lg my-2 flex flex-col items-start">
                      {/* Doctor Info */}
                      <div className="flex justify-between items-center w-full mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h2>
                      </div>

                      {/* Availability Info */}
                      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {doctor.availability.map(({ days, startTime, endTime }, index) => (
                          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                            <p className="font-medium text-gray-700">{days}</p>
                            <p className="text-sm text-gray-600">Start time: {startTime}</p>
                            <p className="text-sm text-gray-600">End time: {endTime}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
           <div  className='space-y-6 py-5'>
           <p className='text-red-500'>Note: Please select date and time in which doctor are available</p>
           <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className='text-gray-800 text-base font-semibold mb-2 block '>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > addDays(new Date(), 15)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
           
           <div className="space-y-6 py-5">
             <FormField  
              control={form.control}
              name='appointmentTime'
              render={({ field }) => (
                <FormItem>  
                  <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                  Your time for appointent
                  </FormLabel>
                  <FormControl>
                    <Input type='time' {...field} placeholder='Your time for appointment' />
                  </FormControl>
                  
                </FormItem>
              )}
            />
        </div>

           <div className="space-y-10 py-5">
             <FormField  
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                  If you want sent a message about or your treatement
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='write here...'/>
                  </FormControl>
                </FormItem>
              )}
            />
        </div>


        <div className='space-y-6 py-5'>
        <FormField  
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 text-base font-semibold mb-2 block">
                    Please Conform or Cancel Your appoimtemt.
                  </FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Conform " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancel">Cancel</SelectItem>
                      <SelectItem value="Conform">Conform</SelectItem>
                    </SelectContent>
              </Select>
                  </FormControl>
                </FormItem>
              )}
            />
        </div>
          <div className="!mt-12">

            
          <Button type="submit" className="py-3 px-4 tracking-wider text-sm rounded-sm bg-primary hover:bg-primary/90 transition-all ease-in-out duration-300 focus:outline-none text-white"  >
          {
              isSubmit ?<> Please wait <Image src='/infinite-spinner.svg' alt="loader" width={40} height={24}/></>:<>Conform</>
          }
          </Button>
          </div>
          </form>
        </Form>
      </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
