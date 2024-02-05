"use server"

import { db } from "@/lib/db"

const updateUser = async (userId: string, userData: Record<string, any>) => {
    try {
        await db.user.update({
            where: { id: userId },
            data: userData
        })
        return { success: "User Updated Successfully" }
    } catch (error) {
        return { error: "Something went wrong!!" }
    }
}

export default updateUser