import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-orange-700 w-screen h-screen flex items-center'>
      <div className='text-center'>
        <button className='p-2 px-4 rounded-lg'>Login with Google</button>
      </div>
    </div>
  )
}
