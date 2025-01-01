// // app/register/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       router.push('/login'); // Redirect to login page after successful registration
//     } else {
//       const errorData = await response.json();
//       console.error(errorData.message);
//       alert(errorData.message); // Show error message to the user
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={email} 
//         onChange={(e) => setEmail(e.currentTarget.value)} 
//         // required 
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password} 
//         onChange={(e) => setPassword(e.currentTarget.value)} 
//         // required 
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// }


// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push('/login'); // Redirect to login page after successful registration
    } else {
      const errorData = await response.json();
      alert(errorData.message); // Show error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Register</button>
    </form>
  );
}
