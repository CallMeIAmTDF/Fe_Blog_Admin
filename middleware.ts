import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // In a real application, you would check for a valid session/token here
  // For demo purposes, we'll just redirect to login if accessing admin routes directly

  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // In a real app, verify authentication token/cookie here
    // For demo, we'll just redirect to login
    // This is a simplified example - in a real app you'd check for valid tokens

    // For demo purposes, we'll let the client-side handle the redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}
