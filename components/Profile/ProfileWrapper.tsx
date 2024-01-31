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
import { Input } from "../ui/input"
import { LegacyRef, useRef, useTransition } from "react"
import Button from "../Button"
import Link from "next/link"

const ProfileWrapper = () => {
  const imageRef: LegacyRef<HTMLInputElement> = useRef(null)
  const [isPending, startTransition] = useTransition()
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
      <Form {...form}>
        <form className="p-3 rounded-lg flex flex-col gap-4 items-center">
          <input 
            type="file"
            hidden
            accept="image/*"
            ref={imageRef}
          />
          <img 
            src={userData?.avatar} 
            alt={userData?.name as string}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" 
            onClick={() => imageRef.current?.click()}
          />
          <FormField 
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            label="Update"
            type="submit"
            styles="w-full"
          />
          <Link href="/listing/create" className="w-full">
            <Button
              type="button"
              label="Create Listing"
              styles="bg-green-700 w-full"
            />
          </Link>
        </form>
      </Form>
      <div className="flex justify-between items-center mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default ProfileWrapper