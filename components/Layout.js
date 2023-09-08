import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useSession, signIn } from "next-auth/react";
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='bg-orange-700 min-h-screen flex'>
        <Nav />
        <div className='w-full p-3 bg-white mt-2 mr-2 mb-2 rounded-lg'>
         {children}
        </div>
      </div>

    )
  };

  return (
    <div className='bg-orange-700 w-screen h-screen flex items-center'>
      <div className='text-center w-full'>
        <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signIn()}>Login with Google</button>
      </div>
    </div>
  )
}
