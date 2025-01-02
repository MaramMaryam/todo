'use client';
import CenteredForm from '../components/CenteredForm';
import LoginForm from './Form';


export default function Login() {

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input 
    //       id="email" 
    //       type="email" 
    //       value={email} 
    //       onChange={(e) => setEmail(e.currentTarget.value)} 
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input 
    //       id="password" 
    //       type="password" 
    //       value={password} 
    //       onChange={(e) => setPassword(e.currentTarget.value)} 
    //     />
    //   </div>
    //   <button type="submit">Login</button>
    // </form>
    <div className=''>
    <CenteredForm>

    <LoginForm />
    </CenteredForm>
    </div>
  );
}



