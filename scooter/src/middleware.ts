import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';


export default withAuth(
  
  function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token;

     console.log(`--- Middleware Running for: ${request.nextUrl.pathname} ---`);
    console.log('Token Exists:', !!token);
    console.log('Token Role:', token?.role);
    if (
      request.nextUrl.pathname.startsWith('/admin') && 
      token?.role !== 'admin'
    ) {

      return NextResponse.redirect(new URL('/', request.url));
    }
    
    
    return NextResponse.next();
  },
  {
    
    callbacks: {
      
      authorized: ({ token, req }) => {
        
        if (req.nextUrl.pathname.startsWith('/protected') || req.nextUrl.pathname.startsWith('/admin')) {
            return !!token; 
        }
        
        return true;
      },
    },
    
    
  }
);


export const config = {
  
  matcher: [
    '/protected/:path*',
    '/admin/:path*',
  ],
};
