import Image from 'next/image'
import React from 'react'
function WelcomeText() {
  return (
  <div className='max-w-[1280px] mx-auto lg:px-10 flex flex-col items-center mb-10 px-5'>
    <div className=''>
      <p className='text-center uppercase tracking-wider text-secondary text-sm font-extrabold'> Welcome to Doctor Now</p>
      <p className='text-center text-xl font-semibold uppercase font-serif text-primary'>A Greate Place to Receive Care</p>
      <p className='text-sm text-center text-gray-500'>We make it simple, take simple steps.</p>
      <hr/>
    </div>
    <div className='mx-auto grid grid-cols-2 md:grid-cols-3 place-content-center sm:grid-cols-2 lg:grid-cols-3 gap-7 h-full w-full py-5 px-5'>
        <div className='flex flex-col md:flex-row rounded-lg gap-5 items-center px-5 justify-center w-full bg-primary py-3'>
          <div className='flex items-center'>
            <p className='text-sm font-medium  text-white'>Book Appointment</p>
          </div>
          <Image src='/icons/Calendar.svg'alt='calender-image' height={24} width={24} className='w-14 p-2 rounded-full bg-accent'/>
        </div>
        <div className='flex flex-col md:flex-row rounded-lg gap-5 items-center px-5 justify-center w-full bg-primary py-3'>
          <div className='flex items-center'>
            <p className='text-sm font-medium  text-white '>Visit on Date</p>
          </div>
          <Image src='/icons/Visit.svg'alt='calender-image' height={24} width={24} className='w-14 p-2 rounded-full bg-accent'/>
        </div>
        <div className='flex flex-col md:flex-row rounded-lg gap-5 items-center px-5 justify-center w-full bg-primary py-3'>
          <div className='flex items-center'>
            <p className='text-sm font-medium  text-white'>Pay on Visiting Day</p>
          </div>
          <Image src='/icons/Money.svg'alt='calender-image' height={24} width={24} className='w-14 p-2 rounded-full bg-accent'/>
        </div>
      </div>
  </div>
  )
}

export default WelcomeText