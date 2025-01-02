'use client';
import LoginForm from './Form';


export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();
//   const { data: session, status } = useSession(); // Get session data
// console.log(session,status)
//   if (status === 'loading') return; // Wait for loading state
// useEffect(() => {

//   if (session) {
//     redirect('/todos'); // Redirect to login if not authenticated
//   }
//   router.push('/login');
// }, [session, status, router]);

 
  // const handleSubmit = async (e:any) => {
  //   e.preventDefault();

  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     email,
  //     password,
  //   });

  //   if (result?.error) {
  //     alert(result.error); // Handle login error
  //   } else {
  //     router.push('/todos'); // Redirect to dashboard after successful login
  //   }
  // };

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
    <div className='border border-gray-400 shadow-md place-items-center  md:w-6/12 flex flex-col justify-center items-center rounded-md'>
    <LoginForm />
    </div>
  );
}



