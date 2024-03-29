"use client"

import FormWrapper from "../FormWrapper"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema } from "@/schemas"
import {
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormField,
    FormLabel
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { useState, useTransition } from "react"
import Button from "../Button"
import Link from "next/link"
import Social from "../Social"
import register from "@/actions/register"
import FormSuccess from "../FormSuccess"
import FormError from "../FormError"

const SignUpForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
  return (
    <FormWrapper label="Sign Up">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                                    placeholder="ex. John Doe"
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
                                    placeholder="johndoe@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    type="password"
                                    placeholder="********"
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
                    label="Sign Up"
                    type="submit"
                />
                <Social />
            </form>
        </Form>
        <div className="flex gap-2 mt-5">
            <p>Already Have an account?</p>
            <Link href="/sign-in">
                <span className="text-blue-700 hover:underline">Sign In</span>
            </Link>
        </div>
    </FormWrapper>
  )
}

export default SignUpForm