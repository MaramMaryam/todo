// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs"; // For password hashing
import clientPromise from "../../../../../lib/mongodb";


export const authOptions: any = {
    
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
        const db = client.db("ToDo"); // Replace with your database name

        const user = await db
          .collection("user")
          .findOne({ email: credentials.email });

          if (user && (await compare(credentials.password, user.password))) {
          return { email: user.email }; // Return user object on successful login
        }

        return null; // Return null if user not found or password doesn't match
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page if needed
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
};



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };










// async function createUser(email: any, password: string) {
//     const client = await clientPromise;
//     const db = client.db("ToDo");
  
//     const hashedPassword = await hash(password, 10); // Hashing the password
  
//     const newUser = {
//       email,
//       password: hashedPassword,
//     };
  
//     await db.collection("user").insertOne(newUser);
//   }