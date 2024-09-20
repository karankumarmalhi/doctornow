import CategoryList from '@/components/CategoryList'
import ContactPage from '@/components/Contact'
import DoctorList from '@/components/DoctorList'
import Hero from '@/components/Hero'
import WelcomeText from '@/components/WelcomeText'
import React from 'react'

function page() {
  return (
    <div>
      <Hero />
      <WelcomeText />
      <CategoryList totalNumber={6} />
      <DoctorList />
      <ContactPage/>
    </div>
  )
}

export default page


// Database connection failed Error: querySrv ETIMEOUT _mongodb._tcp.cluster0.6tim90j.mongodb.net
//     at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:275:17)
//     at QueryReqWrap.callbackTrampoline (node:internal/async_hooks:130:17) { 
//   errno: undefined,
//   code: 'ETIMEOUT',
//   syscall: 'querySrv',
//   hostname: '_mongodb._tcp.cluster0.6tim90j.mongodb.net'
// }