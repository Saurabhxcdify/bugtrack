import { z } from "zod"

export const companySchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
})

