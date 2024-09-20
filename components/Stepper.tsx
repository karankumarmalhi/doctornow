import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

function Stepper({ step1, step2, step3 } :{step1:string,step2:string,step3:string }) {

const pathName = 'doctors'
  return (
    <div className='max-w-[1280px] max-h-fit flex justify-center mx-auto px-5 lg:px-10 py-3 overflow-hidden'>
        <div className='mx-auto flex justify-center'>
        <ul className="relative flex md:flex-row gap-x-2">
            <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className={cn("size-12 text-sm lg:text-lg  flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white", step1 === 'doctors' ? "bg-primary":"bg-gray-100" ) }>
                    {
                     step1 === 'doctors'?(<Check className='text-white'/>):"1"
                    }
                </span>
                <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
                </div>
                <div className="mt-3">
                <span className="block text-sm lg:text-lg text-primary font-semibold dark:text-white md:pr-10">
                   ✅ Select a doctor
                </span>
                </div>
            </li>
            

           
            <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className={cn("size-12 text-sm lg:text-lg  flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white", step2 === 'doctors/patient-form' ?"bg-primary":"bg-gray-100") }>
                    {
                     step2 === 'doctors/patient-form'?(<Check className='text-white'/>):"2"
                    }
                </span>
                <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
                </div>
                <div className="mt-3">
                <span className="block text-sm lg:text-lg font-semibold text-primary dark:text-white md:pr-10">
                    ✅Fill Patient Info
                </span>
                </div>
            </li>


            <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className={cn("size-12 text-sm lg:text-lg  flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white", pathName === 'doctors' ? "bg-gray-100" :"bg-primary") }>
                    {
                     step3 === 'doctor/patient/appointment'?(<Check className='text-white'/>):"3"
                    }
                </span>
                <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
                </div>
                <div className="mt-3">
                <span className="block text-sm lg:text-lg font-semibold text-primary dark:text-white w-full md:pr-10">
                     ✅Book Appointment
                </span>
                </div>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Stepper