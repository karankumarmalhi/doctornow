'use client'

import { Doctor } from '@/app/model/Doctor'
import { useToast } from '@/components/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader' 
import Image from 'next/image'
import { GraduationCap, MapPin, Ribbon, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Patient } from '@/app/model/Patient'
  

function DoctorProfile() {
    const [doctor, setDoctor] = useState<Doctor>()
    const params = useParams()
    const doctorId = params.id
    const [loading, setLoading] = useState<boolean>(true)
    const { toast } = useToast()
    const [appointment, setAppointment] = useState<any[]>([])
    const [patientInfo , setPatientInfo] = useState<Patient[]>([])
    // console.log(patientInfo)



    useEffect(() => {  
        const fetchingDocotor = async ( doctorId:any )=> {
            try {
                setLoading(true)
                
                const response = await axios.get(`/api/doctors/${doctorId}`, {
                  params: {
                    id: doctorId,  // Sending doctorId as a query parameter
            }});

                const data = await response.data
                setDoctor(data.doctor)  
            } catch (error) {
                const axiosError = error as AxiosError
                toast({
                    title:'Error',
                    description:axiosError.message,
                    variant:'destructive'
                })

                console.log(axiosError.message)
            } finally {
                setLoading(false)
            }
        }         
          const fetchingAppointment = async () => {
            try {
            const response = await axios.get(`/api/doctor-appointments/${doctorId}`)
            console.log(response)
              // console.log(response.data.appointments)
              setAppointment(response.data?.appointments)
              setPatientInfo(response.data?.appointments?.patientDetails)
            } catch (error) {
              console.log(error)
            }          
          }
        fetchingDocotor(doctorId)
        fetchingAppointment()
        

    }, [doctorId, toast])

    if(loading) {
        return(
        <div className='w-full h-full flex items-center justify-center'>
            <Loader />
        </div>)
    }

    // if(appointment.length>0) {
    //   setLoading(true)
    // }else{
    //   setLoading(false)
    // }

    // <Image src={'/images/doctor_hero.jpg'} alt="doctor" width={400} height={200} className="object-cover p-3.5 bg-accent rounded-lg" /> 
  return (
    doctor && <div className='min-h-screen max-w-[1280px] px-5 lg:px-10 py-10 mx-auto'>
        <p className='font-bold text-[22px] text-center font-serif text-primary'>Doctor Profile </p>
        <p className='text-center text-gray-500 py-0'>our tursted doctor</p>
    <div className='flex flex-col'>

    {/* Doctor Details */}
      <div className='col-span-3 grid grid-col-1 md:grid-cols-3 gap-5 border rounded-lg p-5 w-full'>
          {/* doctor Image  */}
         <div className=''>
          <Image src={doctor.profilePicture} alt="doctor" width={300} height={200} className="object-cover h-[270px] bg-accent rounded-lg" />
          </div>

          {/* Doctor Info  */}
          <div className='col-span-2 flex flex-col gap-2 items-baseline md:px-10'>
              <p className='font-bold text-2xl'>Dr. {doctor?.firstName } {doctor?.lastName}</p>

             <p className='flex gap-2 text-gray-500'>
              <GraduationCap/> 
              <span className='w-2/3'> {doctor?.qualifications}</span>
             </p>
             <p className='flex gap-2 text-gray-500'>
              <Ribbon/>
              <span> {doctor?.experience} Years of Experience </span>
             </p>

             <p className='flex gap-2 text-gray-500'>
              <MapPin/>
              <span> {doctor?.address}</span>
             </p>

             <p className='flex gap-2 text-gray-500'>
             <UserCheck />
              <span className='text-sm px-2 py-1 bg-primary/25 rounded-full text-primary'>{doctor?.specialization}</span>
             </p>

             <Link href={{
              pathname:'/patient-form',
              query: {doctorId}
             }}   className={buttonVariants({
              className:'text-white mt-3  ',
              variant:'default'
             })}> Book Now </Link>
          </div>

          <div>
              <p className='font-bold text-[22px]'>About me</p>
              <p> { doctor?.bio } </p>
          </div>
      </div>

      <div className='w-full py-10'>
          {/* availabilty */}
        <p className='font-bold text-xl'>Days on Doctor Available</p>
        {
            doctor.availability.map(( { days, startTime, endTime } ) => (
                <Table key={days}>
                <TableCaption key={days}></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]" key={startTime+endTime}>Days</TableHead>
                    <TableHead>Start time</TableHead>
                    <TableHead>End time</TableHead>
                    <TableHead className="text-right">Day/Night</TableHead>
                  </TableRow> npm run dev
                    
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium"> {days} </TableCell>
                    <TableCell>{ startTime }</TableCell>
                    <TableCell> {endTime} </TableCell>
                    <TableCell className="text-right"> day </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
            ))
        }

        <div>
          <p className='text-xl font-semibold'>All Appointment </p>
          {
            appointment.map(( {appointmentDate, appointmentTime,patientDetails }, index ) => (
                <Table key={index}>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Appoint Time</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead className="text-right">Day/Night</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium"> {appointmentDate} </TableCell>
                    <TableCell>{ appointmentTime }</TableCell>
                    <TableCell> {patientDetails.map(({ fullName }: any)=> (
                      <>
                      {
                        fullName
                      }
                      </>
                    ))} </TableCell>
                    <TableCell className="text-right"> day </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
            ))
        }

        </div>
        
      </div>
      
    </div>
  </div>

)
}

export default DoctorProfile
