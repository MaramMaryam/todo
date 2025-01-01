// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('authToken'); // Check for an auth token in cookies

//   // Define protected routes
//   const protectedRoutes = ['/dashboard', '/todos', '/settings'];

//   // Check if the user is trying to access a protected route
//   if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
//     return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not authenticated
//   }

//   return NextResponse.next(); // Proceed if authenticated or not accessing a protected route
// }

// export const config = {
//   matcher: ['/dashboard', '/todos', '/settings'], // Apply middleware to these routes
// };


// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../../lib/jwt'; // Adjust path as necessary

export async function middleware(request: NextRequest) {
  const token:any = request.cookies.get('authToken'); // Get the auth token from cookies

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/todos', '/settings'];

  // Check if the user is trying to access a protected route
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not authenticated
    }
  }

  return NextResponse.next(); // Proceed if authenticated or not accessing a protected route
}

export const config = {
  matcher: ['/dashboard', '/todos', '/settings'], // Apply middleware to these routes
};

