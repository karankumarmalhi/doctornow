'use client'

import { NAVLINK } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import MobileNav from './Mobilenav'
import { User } from 'next-auth'

const Nav: React.FC = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User
  const [providers, setProviders] = useState<Record<LiteralUnion<string>, ClientSafeProvider> | null>(null);


  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()
      setProviders(response);
    }
    setProvider()
  }, [])

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
                session ? (
                    <>
                    <span className="mr-4 font-bold">Welcome,{user.username || user.email} </span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto hover:bg-primary border border-primary text-black hover:text-white" variant={'outline'}>
                        Sign Out
                    </Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button onClick={() => signOut()} className="w-full md:w-auto hover:bg-primary border border-primary text-black hover:text-white" variant={'outline'}>
                        Sign In
                    </Button>
                    </Link>
                )
            }
        </div>

        <MobileNav />
      </div>
    </div>
  )
}

export default Nav
