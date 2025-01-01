// // app/api/auth/login/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '../../../../../lib/mongodb';
// import { compare } from 'bcryptjs';

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const client = await clientPromise;
//   const db = client.db('ToDo');

//   const user = await db.collection('user').findOne({ email });

//   if (user && await compare(password, user.password)) {
//     // Set auth token cookie (you would typically use JWT or session management)
//     const response = NextResponse.json({ message: 'Login successful' });
//     response.cookies.set('authToken', 'your_auth_token_here', { httpOnly: true }); // Set cookie securely
//     return response;
//   }

//   return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
// }
