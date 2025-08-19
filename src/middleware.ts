import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"
);

export async function middleware(request: NextRequest) {
  // Only protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    const token = request.cookies.get("admin-token");

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(token.value, JWT_SECRET);
      
      if (!payload.admin) {
        // Invalid token, redirect to login
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      
      // Token is valid, continue to admin page
      return NextResponse.next();
    } catch (error) {
      // Token verification failed, redirect to login
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
