// // // app/api/auth/login/route.ts
// // import { NextResponse } from 'next/server';
// // import clientPromise from '../../../../../lib/mongodb';
// // import { compare } from 'bcryptjs';

// // export async function POST(req: Request) {
// //   const { email, password } = await req.json();

// //   const client = await clientPromise;
// //   const db = client.db('ToDo');

// //   const user = await db.collection('user').findOne({ email });

// //   if (user && await compare(password, user.password)) {
// //     // Set auth token cookie (you would typically use JWT or session management)
// //     const response = NextResponse.json({ message: 'Login successful' });
// //     response.cookies.set('authToken', 'your_auth_token_here', { httpOnly: true }); // Set cookie securely
// //     return response;
// //   }

// //   return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
// // }

// // app/api/auth/login/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '../../../../../lib/mongodb';
// import { compare } from 'bcryptjs';
// import { signToken } from '../../../../../lib/jwt';

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const client = await clientPromise;
//   const db = client.db('ToDo');

//   const user = await db.collection('user').findOne({ email });

//   if (user && await compare(password, user.password)) {
//     const token = await signToken(user._id.toString());
    
//     const response = NextResponse.json({ message: 'Login successful' });
//     response.cookies.set('authToken', token, { httpOnly: true }); // Set the token as an HTTP-only cookie
//     return response;
//   }

//   return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
// }

// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import cookie from 'cookie';
import clientPromise from '../../../../../lib/mongodb';
import { compare } from 'bcryptjs';
import { signToken } from '../../../../../lib/jwt'; // Function to sign JWT

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('ToDo');

  const user = await db.collection('user').findOne({ email });

  if (user && await compare(password, user.password)) {
    const token = await signToken(user._id.toString()); // Sign the token
    const response = NextResponse.json({ message: 'Login successful' });
    
    // Set the cookie with the JWT
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600, // 1 hour expiration
    });

    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
