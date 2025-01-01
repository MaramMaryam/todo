// // // middleware.ts
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // export function middleware(request: NextRequest) {
// //   const token = request.cookies.get('authToken'); // Check for an auth token in cookies

// //   // Define protected routes
// //   const protectedRoutes = ['/dashboard', '/todos', '/settings'];

// //   // Check if the user is trying to access a protected route
// //   if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
// //     return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not authenticated
// //   }

// //   return NextResponse.next(); // Proceed if authenticated or not accessing a protected route
// // }

// // export const config = {
// //   matcher: ['/dashboard', '/todos', '/settings'], // Apply middleware to these routes
// // };


// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verifyToken } from '../../lib/jwt'; // Adjust path as necessary

// export async function middleware(request: NextRequest) {
//   const token:any = request.cookies.get('authToken'); // Get the auth token from cookies

//   // Define protected routes
//   const protectedRoutes = ['/dashboard', '/todos', '/settings'];

//   // Check if the user is trying to access a protected route
//   if (protectedRoutes.includes(request.nextUrl.pathname)) {
//     if (!token || !(await verifyToken(token))) {
//       return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not authenticated
//     }
//   }

//   return NextResponse.next(); // Proceed if authenticated or not accessing a protected route
// }

// export const config = {
//   matcher: ['/dashboard', '/todos', '/settings'], // Apply middleware to these routes
// };












// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt'; // یا هر روش دیگری که برای دریافت توکن استفاده می‌کنید

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // اگر کاربر در حال تلاش برای دسترسی به صفحه ورود باشد و توکن وجود داشته باشد
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/todos', request.url)); // ریدایرکت به داشبورد
  }

  return NextResponse.next(); // ادامه پردازش اگر توکن وجود نداشته باشد یا در حال دسترسی به صفحه دیگری باشد
}

export const config = {
  matcher: ['/login'], // فقط برای صفحه ورود
};















// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import getToken from next-auth

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });

//   // Define protected routes
//   const protectedRoutes = ['/todos'];

//   // Check if the user is trying to access a protected route
//   if (protectedRoutes.includes(request.nextUrl.pathname)) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not authenticated
//     }
//   }

//   return NextResponse.next(); // Proceed if authenticated or not accessing a protected route
// }

// export const config = {
//   matcher: ['/todos'], // Apply middleware to these routes
// };


