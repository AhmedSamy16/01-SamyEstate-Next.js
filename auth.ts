import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials" || !user.id) return false
            const existingUser = await getUserById(user.id)
            if (!existingUser) return false

            return true
        },
        async session({ session, token }) {
            if (session.user) {
                if (token.role) {
                    session.user.role = token.role as UserRole
                }
                if (token.sub) {
                    session.user.id = token.sub
                }
                session.user.name = token.name
                session.user.email = token.email
                session.user.isOAuth = token.isOAuth as boolean
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            const existingAccount = await getAccountByUserId(token.sub)
            
            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role

            return token
        }
    }
})