// app/register/page.tsx
'use client';

import CenteredForm from '../components/CenteredForm';
import RegisterForm from './Form';

export default function Register() {
  return (
    <div className=''>
    <CenteredForm>

    <RegisterForm />
    </CenteredForm>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <input 
    //     type="email" 
    //     placeholder="Email" 
    //     value={email} 
    //     onChange={(e) => setEmail(e.target.value)} 
    //     required 
    //   />
    //   <input 
    //     type="password" 
    //     placeholder="Password" 
    //     value={password} 
    //     onChange={(e) => setPassword(e.target.value)} 
    //     required 
    //   />
    //   <button type="submit">Register</button>
    // </form>
  );
}
