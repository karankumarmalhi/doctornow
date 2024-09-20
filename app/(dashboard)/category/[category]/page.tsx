'use client'

import { Doctor } from '@/app/model/Doctor'
import { useToast } from '@/components/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader' 
import Image from 'next/image'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Stepper from '@/components/Stepper'

function DoctorByCategory() {
    const [doctor, setDoctor] = useState<Doctor[]>([])
    const params = useParams()
    const category = params.category
    const [loading, setLoading] = useState<boolean>(true)
    const { toast } = useToast()
    console.log(category)

    useEffect(() => {  
        const fatchingDocotor = async ( category:any )=> {
            try {
                setLoading(true)
                const response = await axios.get(`/api/category/${category}`)
                const data = await response.data
                setDoctor(data.data)

            } catch (error) {
                const axiosError = error as AxiosError
                toast({
                    title:'Error',
                    description:axiosError.message,
                    variant:'destructive'
                })
            } finally {
                setLoading(false)
            }
        } 
        fatchingDocotor(category)
        

    }, [category, toast])

    if(loading) {
        return(<div className='min-h-screen max-w-screen-lg mx-auto'>
            <Loader />
        </div>)
    }
    
  return (
    <div className="max-w-[1280px] min-h-screen mx-auto px-5 lg:px-10 mb-10 my-auto">
        <div className='py-3'>
        <p className='text-center tracking-wider uppercase font-extrabold text-secondary text-sm'>Tursted Care</p>
            <p className='text-xl font-serif font-bold text-center uppercase text-primary'>Our Doctors</p>
            <p className='text-sm text-center text-gray-500'>Book appointment instatly</p>
            <hr/>
       </div>
         {
            
            doctor.length>0 ?(
            <>
                <Stepper step1='' step2='' step3=''/> 
            <div className="grid grid-cols-1 md:grid-cols-3  sm:grid-cols-2 lg:grid-cols-4 gap-7  mx-auto">
                {
                    doctor.map((doctor,index) => (
                        <div key={index} className="border-[1px] rounded-lg p-3 gap-1">
                            <Image src={'/images/doctor_hero.jpg'} alt="doctor" width={500} height={200} className="w-full h-[200px] object-cover" />
                            <div className="mt-3 items-baseline flex flex-col ">
                                <p className="text-[10px] bg-primary-100/40 p-1 rounded-full px-2 text-primary">{ doctor.specialization}</p>
                                <p className="font-bold">
                                    { `Dr.${doctor.firstName} ${doctor.lastName}` }
                                </p>
                                <p className="text-primary text-sm">
                                    {
                                        `${doctor.experience} Year of Experience`
                                    }
                                </p>
                                <p className="text-gray-500 text-sm">
                                   {
                                    doctor.qualifications
                                   }
                                </p>

                                 <div className="w-full flex flex-col justify-between py-4">
                                 <Link  href={`/doctors/${doctor._id}`} className={buttonVariants({
                                    variant:"link",
                                    className:'text-start px-0  font-bold'
                                 })}>
                                   Veiw Profile<ChevronRight/>
                                 </Link>

                                 <Link  href={{
                                    pathname:'/patient-form',
                                    query: {
                                        doctorId:doctor._id.toString()
                                    }
                                 }} className={buttonVariants({
                                    variant:"outline",
                                    className:'text-start text-white hover:bg-white hover:text-black bg-primary px-1 text-base font-bold'
                                 })}>
                                   Book Appointment
                                 </Link>
                                 </div>
                            </div>
                        </div>
                        
                    ))
                }
            </div>
            </>
            ): (
                <>
                <section className="bg-white dark:bg-gray-900 ">
                    <div className="container flex items-center max-w-[1280px] h-full px-6 py-12 mx-auto">
                        <div className='h-full w-full grid place-items-center'>
                            <p className="text-sm font-medium text-primary">404 error</p>
                            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl text-center w-full">Doctor for { category } not available now </h1>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the doctor you are looking for  {category} doesn&apos;t available or has been moved.</p>

                            <div className="flex items-center mt-6 gap-x-3">
                                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>

                                    <Link  href='/category'> Go back</Link>
                                </button>

                                <Link  href='/' className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-primary/90  ">
                                    Take me home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                </>
            )
         }
    </div>
)
}

export default DoctorByCategory 