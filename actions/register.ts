"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { SignUpSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

const register = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Fields" }
    }
    const { name, password, email } = validatedFields.data
    const isUserExist = await getUserByEmail(email)
    if (isUserExist) {
        return { error: "User already Exists" }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    return { success: "Created Successfully. Please Login" }
}

export default register