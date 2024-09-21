import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className='min-h-screen max-w-[1280px] mx-auto flex items-center justify-center'>
    <SignIn />
  </div>
  )
}