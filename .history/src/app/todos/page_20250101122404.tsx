// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter,redirect } from 'next/navigation';
import { isAuthenticated } from '../hooks/Auth';

export default function Todo() {
  const router = useRouter();
  const token = getCookie('authToken'); // Function to get cookie value

  if (!token ) {
    redirect('/login'); // Redirect to login if not authenticated
  }
  // if (!token) {
  //   redirect('/login'); // Redirect to login if not authenticated
  // }
  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login'); // Redirect to login if not authenticated
  //   }
  // }, []);
  return (
    <>todo</>
  );
}



function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}






