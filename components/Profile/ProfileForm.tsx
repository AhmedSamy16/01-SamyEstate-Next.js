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
import { Input } from "../ui/input"
import Button from "../Button"
import Link from "next/link"
import useCurrentUser from "@/hooks/useCurrentUser"
import { useState, useTransition } from "react"
import ProfileImage from "./ProfileImage"
import updateUser from "@/actions/updateUser"
import FormSuccess from "../FormSuccess"
import FormError from "../FormError"

const ProfileForm = () => {
  const userData = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: userData?.name as string,
      email: userData?.email as string
    }
  })

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      updateUser(userData?.id as string, values)
        .then(data => {
          if (data.error) {
            setError("Something went wrong")
          } else {
            setSuccess("Updated Successfully")
          }
        })
        .catch(() => {
          setError("Something went wrong")
        })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-3 rounded-lg flex flex-col gap-4 items-center">
        <ProfileImage />
        <FormField 
          control={form.control}
          name="name"
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
        <FormSuccess message={success} />
        <FormError message={error} />
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
  )
}

export default ProfileForm