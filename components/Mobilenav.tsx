'use client'

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
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

  

function MobileNav() {

    // const user = useUser()
    // const [isSignIn, setIsSignIn] = useState<boolean>(false)
  
    // if(user.isSignedIn) {
    //   setIsSignIn(true)
    // }
  

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
                        {/* <div className='lg:hidden  gap-2 items-center'>
                                {
                                isSignIn !== true ?(
                                    <Button asChild className='text-white'>
                                    <SignInButton/>
                                    </Button>
                                ):(
                                    <UserButton/>
                                )
                                }
                        </div> */}

                        <UserButton/>
               </ul>

               

            </SheetContent>
            </SheetClose>
        </Sheet>
    </div>
  )
}

export default MobileNav