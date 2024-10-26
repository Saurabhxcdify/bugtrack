'use client'

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateOpenRelease } from '@/src/queries/projects/details/open-releases/create-open-release'
import { Plus } from 'lucide-react'

const formSchema = z.object({
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
        message: "Start date must be a valid date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date",
    }),
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "End date must be after start date",
    path: ["endDate"],
})

function NewRelease() {
    const [open, setOpen] = React.useState(false)
    const createOpenRelease = useCreateOpenRelease()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            appVersion: "",
            startDate: "",
            endDate: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createOpenRelease.mutate(values)
        setOpen(false)
        form.reset()
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Release
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create New Release</SheetTitle>
                </SheetHeader>
                <div className='py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Release Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter release name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter release description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="appVersion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>App Version</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 1.0.0" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Version number in the format x.x.x
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Create Release</Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NewRelease
