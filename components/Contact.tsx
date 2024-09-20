import { Mail, Map, Phone } from 'lucide-react'
import React from 'react'

function ContactPage() {
  return (
    <div className=' max-w-[1280px] mx-auto px-5 lg:px-10 py-5'>
      <div className='py-3'>
        <p className='text-center tracking-wider uppercase font-extrabold text-secondary text-sm'>Get in touch</p>
            <p className='text-xl font-serif font-bold text-center uppercase text-primary'>Contact</p>
            <hr/>
       </div>

       <div className='flex flex-col md:flex-row gap-10 px-5 text-white'>
          <div className='h-[200px] flex flex-col items-center py-5 gap-3 w-full bg-primary rounded-lg'>
            <Phone size={40} />
          <p className='tracking-wider uppercase text-start text-lg font-bold'>Emergency</p>
          <p className='flex flex-col items-center text-sm  '>
            <span>(237) 681-812-255</span>
            <span>(237) 666-331-894</span>          
          </p>
          </div>
          <div className='h-[200px] flex flex-col items-center py-5 gap-3 w-full bg-primary rounded-lg'>
            <Mail size={40} />
          <p className='tracking-wider uppercase text-start text-lg font-bold'>Email</p>
          <p className='flex flex-col items-start text-sm  '>
          
            <span>fildineeesoe@gmil.com</span>
            <span>myebstudios@gmail.com</span>          
          </p>
          </div>
          <div className='h-[200px] flex flex-col items-center py-5 gap-3 w-full bg-primary rounded-lg'>
            <Map size={40} />
          <p className='tracking-wider uppercase text-start text-lg font-bold'>
          Location
          </p>
          <p className='flex flex-col items-start text-sm  '>
            <span>0123 Some place</span>
            <span>9876 Some country</span>          
          </p>
          </div>
       </div>
    </div>
  )
}

export default ContactPage