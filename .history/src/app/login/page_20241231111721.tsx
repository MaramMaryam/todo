// app/login/page.js
'use client'; // This component should be a client component

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const initialValues: any = {
        email:  '',
        password: '',
    }
//   const [email, setEmail] = useState('mdanehvash2014');
//   const [password, setPassword] = useState('MhhU4YOYSCj197Rd');
  const router = useRouter();

//   const handleSubmit =(values:any)=> { console.log(values) }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(e)
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
console.log(email)
    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/'); // Redirect after successful login
    }
  };

  return (
    <form onSubmit={handleSubmit} in>
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
