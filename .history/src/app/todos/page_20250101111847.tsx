// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../hooks/Auth';
 Assuming you're using next-auth for session management



export default function Todo() {
  const router = useRouter();
  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login'); // Redirect to login if not authenticated
  //   }
  // }, []);
  return (
    <>todo</>
  );
}






