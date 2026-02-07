'use client'
import { useSession,signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
const {data:session}=useSession()
  return (
    <main className="flex min-h-screen items-center justify-center">
    <div className="flex flex-col items-center ">
       <div>
       <h1 className="text-2xl font-semibold">
        Asymmetri AI Assistant
      </h1>
     </div>
    <div>
        <Link href={'/chat'} className="text-blue-500 hover:underline">Go to Chat</Link>
    </div>
    {
      session?<>
      <button onClick={() => signOut()} >
      Sign Out
    </button></>:<></>
    }
    </div>
    </main>
  );
}
