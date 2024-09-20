"use client"; 

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse'
import Loader from '@/components/Loader';
import { useToast } from '@/components/hooks/use-toast';
import Image from 'next/image';
import { Doctor } from '../../model/Doctor'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { SkeletonCard } from '@/components/SekeletonCard';
import Stepper from '@/components/Stepper';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true);
    const { toast } = useToast()

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/doctors'); // Adjust the endpoint if necessary
                if (response) {
                    setDoctors(response.data.doctors);
                } else {
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                   </div>
                }

                console.log(response)
            } catch (err) {
              const axiosError = err as AxiosError<ApiResponse>
                // Handle different error scenarios
                if (axiosError.response) {
                    toast({
                        title:'Error',
                        description:"Your internet is very slow",
                        variant:'destructive'
                    })
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [toast]);

    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'><Loader/></div>;
    }

    return (
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 mb-10">
            <Stepper step1='' step2='' step3=''/>
        <div className='py-3'>
        <p className='text-center tracking-wider uppercase font-extrabold text-secondary text-sm'>Tursted Care</p>
            <p className='text-xl font-serif font-bold text-center uppercase text-primary'>Our Doctors</p>
            <p className='text-sm text-center text-gray-500'>Book appointment instatly</p>
            <hr/>
       </div>
         {
            doctors.length>0 ?(
            <div className="grid grid-cols-1 md:grid-cols-3  sm:grid-cols-2 lg:grid-cols-4 gap-7  mx-auto">
                {
                    doctors.map((doctor,index) => (
                        <div key={index} className="border-[1px] rounded-lg p-3 gap-1">
                            <Image src={doctor.profilePicture} alt="doctor" width={500} height={200} className="w-full h-[200px] object-cover" />
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
            ): (
                <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
                </>
            )
         }
    </div>
    );
};


export default DoctorsPage;
