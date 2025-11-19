import { auth } from "@/auth"
import { NextResponse } from "next/server"
 
export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }
})
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

