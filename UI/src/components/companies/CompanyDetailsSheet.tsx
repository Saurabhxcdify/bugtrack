"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { GetCompanyById } from "@/src/queries/companies/get-company";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "./schema";
import { z } from "zod";
import { Pencil } from "lucide-react";

function CompanyDetailsSheet({
  open,
  onOpenChange,
  companyId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string | undefined;
}) {
  const { data, isLoading, isError } = useQuery(
    GetCompanyById(companyId ?? "")
  );
  const [editMode, setEditMode] = useState(false);

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  function onSubmit(values: z.infer<typeof companySchema>) {
    console.log(values);
  }

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Company Details {companyId ? `- ID: ${companyId}` : ""}
          </SheetTitle>
        </SheetHeader>
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching company data</div>}
          {data && (
            <>
              <Button onClick={() => setEditMode(!editMode)} className={`p-3 w-10 h-10 float-right ${editMode ? 'bg-gray-200' : ''}`}>
                <Pencil  />
              </Button>
              <div className="clear-right">
                <Form {...form}>
                  <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={!editMode}
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
                    name="description"
                    disabled={!editMode}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter company description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a brief description of your company.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {editMode && (
                    <>
                    <Button type="submit">Submit</Button>
                    <Button className="ml-2" onClick={() => setEditMode(false)} variant="outline">Cancel</Button>
                    </>
                  )}
                </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CompanyDetailsSheet;
