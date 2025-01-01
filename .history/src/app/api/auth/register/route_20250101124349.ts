// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('ToDo');

  // Check if the user already exists
  const existingUser = await db.collection('user').findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Hash the password before saving it
  const hashedPassword = await hash(password, 10);

  // Create a new user in the database
  await db.collection('user').insertOne({ email, password: hashedPassword });

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
