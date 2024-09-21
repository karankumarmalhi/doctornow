import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-screen min-w-[1280px] mx-auto flex items-center justify-center py-10'>
    <SignUp />
  </div>
  )
}