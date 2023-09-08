
import { useSession, signOut } from "next-auth/react";
import Layout from '@/components/Layout';
import avatar1 from '../assets/nomad-hair-grey-bun.png'

export default function Home() {
  const { data: session } = useSession();
  if (!session) { return };
  return (
    <Layout>
      <div className="text-orange-700 flex justify-between">
        <h2>Hello {session?.user?.name}</h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={(session?.user?.image) ? session?.user?.image : avatar1} className="w-6 h-6 " />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )

}
