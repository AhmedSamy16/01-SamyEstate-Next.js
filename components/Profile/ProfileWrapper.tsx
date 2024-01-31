"use client"

import * as z from "zod"
import { ProfileSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import useCurrentUser from "@/hooks/useCurrentUser"

const ProfileWrapper = () => {
  const userData = useCurrentUser()
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: userData?.name as string,
      email: userData?.email as string
    }
  })
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
    </div>
  )
}

export default ProfileWrapper