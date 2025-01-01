// // lib/jwt.ts
// import { SignJWT, jwtVerify } from 'jose';

// const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET); // Ensure you have a JWT_SECRET in your .env file

// export const signToken = async (userId: string) => {
//   const token = await new SignJWT({ id: userId })
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('2h') // Token expires in 2 hours
//     .sign(SECRET_KEY);
//   return token;
// };

// export const verifyToken = async (token: string) => {
//   try {
//     const { payload } = await jwtVerify(token, SECRET_KEY);
//     return payload; // Return payload if verification is successful
//   } catch (error) {
//     return null; // Return null if verification fails
//   }
// };
