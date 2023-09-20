
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Layout from '@/components/Layout';
import avatar1 from '../assets/nomad-hair-grey-bun.png'

export default function Home() {
  const { data: session } = useSession();
  if (!session) { return };
  return (
    <Layout>
      <div className="text-orange-700 flex justify-between">
        <h2>Hello <span  className="font-medium">{session?.user?.name}</span></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <Image src={(session?.user?.image) ? session?.user?.image : avatar1} width={24} height={24} alt="user image"/>
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )

}
