import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { DialogButton } from './DialogButton'


function Hero() {
  return (
    <section>
  <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
      <Image
        alt=""
        src="/images/Hero2.webp"width={800} height={800}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <div className="lg:py-24 flex flex-col justify-center gap-10">
    <h1 className='text-3xl font-bold'>Effortlessly<span className='inline text-primary'> Book Doctor Appointments </span>with Just Few Clicks</h1>
    <p className='text-lg text-gray-500 font-medium'>Our platform makes it simple and convenient to book appointments with trusted doctors. Browse through available professionals, select your preferred time, and confirm your visit—all from the comfort of your home.</p>

    <div className='flex flex-col-reverse md:gap-3 md:flex-row md:items-center justify-start md:justify-start  gap-5'>
        <Link href={{
          pathname:'/doctors',
        }} className=" inline-block w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-black border border-primary focus:outline-none focus:ring focus:ring-yellow-400 text-center">
              Book Appointment<ChevronRight  className='inline '/>
        </Link>

        <DialogButton/>
    </div>
    </div>
  </div>
</div>
</section>
  )
}
export default Hero

// 