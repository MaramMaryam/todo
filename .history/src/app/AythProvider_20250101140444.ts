// app/AuthProvider.tsx
"use client"; // This tells Next.js that this is a client component

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
