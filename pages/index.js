import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className='bg-orange-700 w-screen h-screen flex items-center'>
      {session ?
        <div className='text-center w-full'>
         <p className='text-lg text-white'>Signed in as {session.user.email}</p>
          <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signOut()}>Sign out</button>
        </div>
        :
        <div className='text-center w-full'>
          <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signIn()}>Login with Google</button>
        </div>}
    </div>
  )
}
