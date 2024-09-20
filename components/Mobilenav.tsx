import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { NAVLINK } from '@/constant'
import Link from 'next/link'
import { Button } from './ui/button'
import { signOut, useSession, getProviders,  } from 'next-auth/react'
import { User } from 'next-auth'
  

function MobileNav() {

  const { data: session } = useSession();
  const user: User = session?.user as User

  return (
    <div className='flex lg:hidden'>
        <Sheet>
            <SheetTrigger className='flex lg:hidden'><Menu  className='text-primary flex lg:hidden'/></SheetTrigger>
            <SheetClose>
            <SheetContent side={'top'}>
               <ul className='flex lg:hidden flex-col items-center justify-center gap-6'>
                {
                    NAVLINK.map(( {id, path, name} ) =>(
                        <SheetClose key={id}>
                            <Link href={path} key={id} className='hover:text-primary'>
                                {name}
                            </Link>
                        </SheetClose>
                    ))
                }
                {
                session ? (
                    <>
                    <span className="mr-4 font-bold">Welcome,{user.username || user.email} </span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto hover:bg-primary border border-primary text-black hover:text-white" variant={'outline'}>
                        SignOut
                    </Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button onClick={() => signOut()} className="w-full md:w-auto hover:bg-primary border border-primary text-black hover:text-white" variant={'outline'}>
                        SignIn
                    </Button>
                    </Link>
                )
            }
               </ul>

            </SheetContent>
            </SheetClose>
        </Sheet>
    </div>
  )
}

export default MobileNav