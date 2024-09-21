'use client'

import { NAVLINK } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import MobileNav from './Mobilenav'
import { User } from 'next-auth'
import { SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'

const Nav: React.FC = () => {
  const user = useUser()
  const [isSignIn, setIsSignIn] = useState<boolean>(false)

  if(user.isSignedIn) {
    setIsSignIn(true)
  }


  return (
    <div className='shadow-md w-full'>
      <div className='flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center'>
          <Image src='/Logo.svg' alt='logo' width={40} height={80} />
          <span className='text-base hidden lg:text-lg font-bold text-primary text-start md:inline px-1'>DoctorNow</span>
        </Link>

        <ul className='lg:flex gap-4 hidden '>
          {
            NAVLINK.map(({ id, name, path }) => (
              <Link key={id} href={path} className='hover:text-primary text-base font-medium hover:scale-105 transition-all ease-in-out'>
                {name}
              </Link>
            ))
          }
        </ul>

        <div className='lg:flex hidden gap-2 items-center'>
         {
          isSignIn !== true ?(
            <Button asChild className='text-white'>
              <SignInButton/>
            </Button>
          ):(
            <UserButton/>
          )
         }
         
        </div>

        <MobileNav />
      </div>
    </div>
  )
}

export default Nav
