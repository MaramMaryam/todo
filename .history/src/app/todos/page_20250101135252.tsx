// app/login/page.js
// 'use client'; // This component should be a client component

import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
import { isAuthenticated } from "../hooks/Auth";
import { cookies } from "next/headers";
import { getToken } from 'next-auth/jwt';


export default async function Todo() {
  // const router = useRouter();
  const cookieStore = await cookies(); // Get all cookies
  const token = cookieStore.get("next-auth.session-token")?.value;
  const tokens = await getToken('next-auth.session-token'); // Retrieve the auth token
  console.log(token,tokens);

  if (!token) {
    redirect("/login"); // Redirect to login if token is invalid or not present
  }
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

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
