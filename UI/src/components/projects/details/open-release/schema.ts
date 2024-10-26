import { z } from "zod"

export const openReleasesSchema = z.object({
    id: z.number(),
    name: z.string().min(2, {
        message: "Release name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    appVersion: z.string().regex(/^\d+\.\d+\.\d+$/, {
        message: "App version must be in the format x.x.x",
    }),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Start date must be a valid date string.",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date string.",
    }),
    status: z.enum(["Open", "In Progress"]),
})
