// app/SessionProviderWrapper.tsx
"use client"; // This tells Next.js that this is a client component

import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({ children, session }:) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
