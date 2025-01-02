import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; // Use bcryptjs for password comparison
import clientPromise from "../../../../../lib/mongodb"; // Adjust the path to your MongoDB connection

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your.email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const client = await clientPromise;
        const db = client.db("ToDo");

        const user = await db
          .collection("user")
          .findOne({ email: credentials.email });

        if (user && (await compare(credentials.password, user.password))) {
          return { id: user._id, email: user.email }; // Return user object on successful login
        }

        return null; // Return null if user not found or password doesn't match
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this line is present
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
