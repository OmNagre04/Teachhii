import { SignIn } from '@clerk/nextjs'

const page = () => {
  return (
    <main className='flex justify-center items-center'>
      <SignIn/>
    </main>
  )
}

export default page
