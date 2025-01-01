// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../hooks/Auth';
import { getServerSession } from 'next-auth';

export default function Todo() {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, []);
  return (
    <>todo</>
  );
}



