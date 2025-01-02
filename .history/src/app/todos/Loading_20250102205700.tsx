// Header.tsx
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  email?: string | any;
}

const Header: React.FC<HeaderProps> = ({ email }) => {


  return (
    <>
      
    </>
  );
};

export default Header;
