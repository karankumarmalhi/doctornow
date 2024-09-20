    'use client'
    import { useEffect, useState } from "react"
    import { SkeletonCard } from "./SekeletonCard"
    import Image from "next/image"
    import { Doctor } from "@/app/model/Doctor"
    import GlobalApi from "./helper/GlobalApi"
    import Link from "next/link"
    import { buttonVariants } from "./ui/button"
    import { ChevronRight } from "lucide-react"


    function DoctorList( ) {
        const [doctorList , setDoctorList] = useState<Doctor[]>([])


        useEffect(() => {
            doctorLis()
        }, [])
        const doctorLis = ()=> {
            GlobalApi.getDoctor().then(resp => (
                setDoctorList(resp.data.doctors)
            ))
        }

    return (
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 mb-10 py-10">
            <div className='py-3'>
            <p className='text-center tracking-wider uppercase font-extrabold text-secondary text-sm'>Tursted Care</p>
                <p className='text-xl font-serif font-bold text-center uppercase text-primary'>Our Doctors</p>
                <p className='text-sm text-center text-gray-500'>Book appointment instatly</p>
                <hr/>
        </div>
            {
                doctorList.length>0 ?(
                <div className="grid grid-cols-1 md:grid-cols-3  sm:grid-cols-2 lg:grid-cols-4 gap-7  mx-auto">
                    {
                        doctorList.map((doctor,index) => (
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
    )
    }

    export default DoctorList