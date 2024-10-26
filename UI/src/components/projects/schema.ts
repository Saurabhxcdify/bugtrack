import { z } from "zod"

export const projectSchema = z.object({
    name: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    key_name: z.string().min(10, {
        message: "Key name must be at least 10 characters.",
    }),
})

