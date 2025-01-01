// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../hooks/Auth';
import { getServerSession } from 'next-auth'; // Assuming you're using next-auth for session management
import { authOptions } from '../api/auth/[...nextauth]/route'; // Adjust based on your auth setup

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


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // Pass session data as props if needed
  };
}



