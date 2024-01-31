"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { signIn } from "@/auth"

const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }
    const { email, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "User Not found" }
    }
    try {
        await signIn("credentials", {
            email,
            password,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        }
    }
}

export default login