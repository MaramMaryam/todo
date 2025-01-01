// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../hooks/Auth';
import { getServerSession } from 'next-auth';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { authOptions } from '../api/auth/[...nextauth]/route';

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



export async function getServerSideProps(context: { req: any | NextApiRequest | (IncomingMessage & { cookies: NextApiRequestCookies; }); res: any | ServerResponse<IncomingMessage> | NextApiResponse; }) {
  const session = await getServerSession(context.req, context.res, authOptions); // Adjust based on your auth setup

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
