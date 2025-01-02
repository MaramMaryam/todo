// Header.tsx
import React from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  email?: string | any | emai;
}

const Header: React.FC<HeaderProps> = ({ email }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-start mx-14">
      <h3>Welcome to your Dashboard!</h3>
      <p>{email}</p>
      <button className="text-orange-800 font-bold m-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
