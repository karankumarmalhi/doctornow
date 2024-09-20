import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className='max-w-[1280px] h-screen flex items-center justify-center'>
        <Image src='/Loader.svg' alt='loader' width={100} height={100}/>
    </div>
  )
}

export default Loader