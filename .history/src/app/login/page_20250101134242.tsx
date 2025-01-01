// // app/login/page.js
// 'use client'; // This component should be a client component

// app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cookies } from "next/headers";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const cookieStore = await cookies(); // Get all cookies
  const token = cookieStore.get("next-auth.session-token")?.value; // Retrieve the auth token
  console.log(token);

  if (!token) {
    redirect("/login"); // Redirect to login if token is invalid or not present
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert(result.error); // Handle login error
    } else {
      router.push('/todos'); // Redirect to dashboard after successful login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.currentTarget.value)} 
          // required 
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.currentTarget.value)} 
          // required 
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}




// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     const result = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });
//     if (result?.error) {
//       console.error(result.error);
//     } else {
//       router.push('/todos'); // Redirect after successful login
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} >
//       <input 
//         // type="email" 
//         placeholder="Email" 
//         value={email} 
//         onChange={(e) => setEmail(e.currentTarget.value)} 
//         // required 
//       />
//       <input 
//         // type="password" 
//         placeholder="Password" 
//         value={password} 
//         onChange={(e) => setPassword(e.currentTarget.value)} 
//         // required 
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
