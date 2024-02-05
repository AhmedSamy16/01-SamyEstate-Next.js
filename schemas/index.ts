
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
    name: z.string().min(1, {
        message: "name is required"
    })
})

export const ProfileSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string()),
})

export const ListingSchema = z.object({
    name: z.string().min(6, {
        message: "Name length min 6 charachters"
    }),
    description: z.string().min(25, {
        message: "Description min length is 25 charachters"
    }),
    address: z.string().min(5, {
        message: "Address min length is 5 charachters"
    }),
    type: z.enum(["sell", "rent"]).describe("Must be sell or rent").superRefine((value, ctx) => {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Type must be rent or sell"
        })
    }),
    parking: z.boolean().default(false),
    furnished: z.boolean().default(false),
    offer: z.boolean().default(false),
    bedrooms: z.number().min(1).max(20),
    bathrooms: z.number().min(1).max(5),
    regularPrice: z.number().min(1, {
        message: "Price is required"
    }),
    discountPrice: z.number().default(0),
})