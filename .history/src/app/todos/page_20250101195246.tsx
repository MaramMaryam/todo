// app/login/page.js
'use client'; // This component should be a client component

import { signIn, useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Todo() {

  // const cookieStore = await cookies(); // Get all cookies
  // const token = cookieStore.get("next-auth.session-token")?.value;
  // // const tokens = await getToken(); // Retrieve the auth token
  // console.log(token);

  // if (!token) {
  //   redirect("/login"); // Redirect to login if token is invalid or not present
  // }
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for loading state
    if (!session) {
      redirect('/login'); // Redirect to login if not authenticated
    }
  }, [session, status, router]);
  // const verifiedToken = await verifyToken(token); // Verify the JWT

  // // Check if verification was successful
  // if (!verifiedToken) {
  //   router.push("/login"); // Redirect if token is invalid
  // }
  // || !(await verifyToken(token))

  // if (!token || !(await verifyToken(token))) {
  //   redirect('/login'); // Redirect to login if token is invalid or not present
  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login'); // Redirect to login if not authenticated
  //   }
  // }, []);
  return <>todo</>;
}


