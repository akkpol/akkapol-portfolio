import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { appendLog } from "@/utils/logger"

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

function isAdmin(email?: string | null) {
  if (!email) return false
  return adminEmails.includes(email.toLowerCase())
}

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const userRole = auth?.user?.role
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/dashboard")

      if (isAdminRoute) {
        return userRole === "admin"
      }

      if (!isLoggedIn) {
        return true
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/auth/signin")) {
        return Response.redirect(new URL("/", nextUrl))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.role = isAdmin(user.email) ? "admin" : "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "admin" | "user") ?? "user"
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      await appendLog({
        timestamp: new Date().toISOString(),
        action: "login",
        email: user.email,
      })
    },
  },
} satisfies NextAuthConfig
