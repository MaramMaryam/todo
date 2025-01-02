
import { NextResponse } from 'next/server';
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
