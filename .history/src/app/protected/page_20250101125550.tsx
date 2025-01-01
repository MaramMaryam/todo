// // Example of protecting a page (e.g., app/protected/page.js)
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]/route';

// export default async function ProtectedPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return <h1>You must be logged in to view this page.</h1>;
//   }

//   return <h1>Welcome to the protected page!</h1>;
// }


