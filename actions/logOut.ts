"use server"

import { signOut } from "@/auth"

const logOut = async () => {
    await signOut()
}

export default logOut