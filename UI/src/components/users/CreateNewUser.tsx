'use client'

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateUser } from '@/src/queries/users/create-user'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "User name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
})

function CreateUser({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        useCreateUser.mutate(values)
        // We'll handle the submission in the parent component
        console.log(values)
    }
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Create New User
                    </SheetTitle>
                </SheetHeader>
                <div className='py-4'>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter user name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of your user.
                                    </FormDescription>
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
                                            placeholder="Enter email"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateUser