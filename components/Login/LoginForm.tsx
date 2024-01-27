"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { useTransition } from "react"
import Button from "../Button"
import Link from "next/link"
import FormWrapper from "../FormWrapper"
import Social from "../Social"

const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    return (
        <FormWrapper label="Sign In">
            <Form {...form}>
                <form className="flex flex-col gap-4">
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
                    <Button
                        type="submit"
                        disabled={isPending}
                        label="Login"
                    />
                    <Social />
                </form>
            </Form>
            <div className="flex gap-2 mt-5">
                <p>Don't Have an account?</p>
                <Link href="/sign-up">
                    <span className="text-blue-700 hover:underline">Sign Up</span>
                </Link>
            </div>
        </FormWrapper>
    )
}

export default LoginForm