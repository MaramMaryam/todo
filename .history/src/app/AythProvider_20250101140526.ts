// app/AuthProvider.tsx
// "use client"; // This tells Next.js that this is a client component

import { SessionProvider } from "next-auth/react";
import React from "react";

export const AuthProvider = ( children : React.ReactNode) => {
  return <SessionProvider>{children}</SessionProvider>;
};
