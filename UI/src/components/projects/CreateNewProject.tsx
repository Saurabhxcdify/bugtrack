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
import { useCreateCompany } from '@/src/queries/companies/create-companies'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    keyName: z.string().min(10, {
        message: "Key name must be at least 10 characters.",
    }),
})

function CreateNewProject({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            keyName: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        useCreateCompany.mutate(values)
        // We'll handle the submission in the parent component
        console.log(values)
    }
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Create New Company
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
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter company name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of your company.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="keyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Key Name</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter key name"
                                            className="resize-none"
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

export default CreateNewProject