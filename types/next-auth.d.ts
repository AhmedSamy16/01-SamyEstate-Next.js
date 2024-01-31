import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole,
    isOAuth: boolean,
    avatar: string
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}