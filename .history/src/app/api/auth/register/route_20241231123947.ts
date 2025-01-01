// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../../../lib/mongodb";
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

// Adjust the import based on your project structure

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Connect to the database
  const client = await clientPromise;
  const db = client.db('ToDo'); // Replace with your database name

  // Check if the user already exists
  const existingUser = await db.collection('user').findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create a new user
  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await db.collection('user').insertOne(user);
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}




// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const client = await clientPromise;
//     const collection = client.db().collection("user");
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   await clientPromise;

//   const { email, password } = req.body;

//   // Check if the user already exists
//   const existingUser = await collection.findOne({ email });
//   if (existingUser) {
//     return res.status(409).json({ message: 'User already exists' });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new user
//   const user = new User({
//     email,
//     password: hashedPassword,
//   });

//   try {
//       await user.save();
//       await collection.insertOne(user);
//     // await collection.insertOne(user);

//     return NextResponse.json({ status: 201, message: 'User registered successfully' });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: 'Error registering user' });
//   }
// }
