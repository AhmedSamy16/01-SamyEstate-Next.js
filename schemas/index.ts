
import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password should be 6 or more charachters"
    }),
    username: z.string().min(1, {
        message: "name is required"
    })
})