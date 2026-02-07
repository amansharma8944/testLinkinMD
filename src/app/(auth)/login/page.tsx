"use client";

import { signIn, useSession } from "next-auth/react";
  import { redirect } from "next/navigation";

import GoogleButton from 'react-google-button'

export default function LoginPage() {
  const {data}=useSession()

  if(data){
    redirect("/chat");

  }
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      
      <GoogleButton onClick={() => signIn("google", { callbackUrl: "/chat" })}>
        Sign in with Google
      </GoogleButton>
    </div>
  );
}
