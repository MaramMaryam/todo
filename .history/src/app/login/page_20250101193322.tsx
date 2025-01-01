// app/login/page.tsx
// 'use client';

// import { useEffect } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { getToken } from 'next-auth/jwt';

// export default function LoginPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await getToken(); // دریافت توکن

//       if (token) {
//         router.push('/dashboard'); // اگر توکن وجود دارد، ریدایرکت به داشبورد
//       }
//     };

//     checkAuth();
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const result = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       alert(result.error); // مدیریت خطا
//     } else {
//       router.push('/dashboard'); // ریدایرکت به داشبورد پس از ورود موفق
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" type="email" required />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" type="password" required />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// }


// app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { signIn  } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getToken } from 'next-auth/jwt';
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // Assuming getToken is a function that retrieves the token
  //     const token = await getToken(); // Ensure getToken is defined and returns a promise

  //     if (token) {
  //       router.push('/todos'); // Redirect to dashboard if token exists
  //     }
  //   };

  //   checkAuth();
  // }, [router]);
 
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
