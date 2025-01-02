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
