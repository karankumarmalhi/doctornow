import { DoctorCategory } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList() {
  return (
    <div className='flex flex-col max-w-[1280px] mx-auto px-5 lg:px-10 py-10'>
       <div className='py-3'>
        <p className='text-center tracking-wider uppercase font-extrabold text-secondary text-sm'>Always Caring</p>
            <p className='text-xl font-serif font-bold text-center uppercase text-primary'>Check Out Category & Just Click</p>
            <p className='text-sm text-center text-gray-500'>Select a category and land on doctor profile to this category</p>
            <hr/>
       </div>

        <div className='grid grid-cols-2 md:grid-cols-3 place-items-center gap-5 px-5 '>
            {
                DoctorCategory.map(( { id, category, imageSrc }, index  ) => (
                   <Link href={`/category/${category}`} key={id} className='bg-accent flex flex-col justify-center items-center h-52 w-full gap-1 py-2 px-4 hover:shadow-md rounded-lg transition-all ease-in-out duration-300 hover:bg-primary/25'>
                     <Image src={imageSrc} alt='images' width={50} height={20} key={index} className='h-[60px] w-[60px]'/>
                     <p className='text-sm px-1 py-0.5 text-white rounded-full bg-primary'>{category} </p>
                   </Link>
                ))
            }
        </div>
    </div>
  )
}

export default CategoryList