// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs'; // For password hashing
import clientPromise from '../../lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your.email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db('your-database-name'); // Replace with your database name

        const user = await db.collection('users').findOne({ email: credentials.email });
        
        if (user && await compare(credentials.password, user.password)) {
          return { email: user.email }; // Return user object on successful login
        }
        
        return null; // Return null if user not found or password doesn't match
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page if needed
  },
  session: {
    strategy: 'jwt',
  },
});
