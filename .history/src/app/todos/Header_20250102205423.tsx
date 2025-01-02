// Header.tsx
import React from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  email?: string | any ;
}

const Header: React.FC<HeaderProps> = ({ email }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
    </>
    <div className="flex justify-between items-start mx-14">
      <h3>Welcome to your Dashboard!</h3>
      <p>{email}</p>
      
    </div>
  );
};

export default Header;
