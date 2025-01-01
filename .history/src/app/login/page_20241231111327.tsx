// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('mdanehvash2014');
  const [password, setPassword] = useState('MhhU4YOYSCj197Rd');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/'); // Redirect after successful login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        // type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.currentTarget.value)} 
        // required 
      />
      <input 
        // type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        // required 
      />
      <button type="submit">Login</button>
    </form>
  );
}
