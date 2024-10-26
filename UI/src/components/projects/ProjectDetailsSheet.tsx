"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { GetProjectById } from "@/src/queries/projects/get-project";
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
import { z } from "zod";
import { Pencil } from "lucide-react";
import { projectSchema } from "./schema";

function ProjectDetailsSheet({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) {
  const { data, isLoading, isError } = useQuery(
    GetProjectById(projectId ?? "")
  );
  const [editMode, setEditMode] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: data?.name,
      key_name: data?.key_name,
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
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
            Project Details {projectId ? `- ID: ${projectId}` : ""}
          </SheetTitle>
        </SheetHeader>
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching project data</div>}
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
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="key_name"
                    disabled={!editMode}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Name</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter project key name"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a brief description of your project.
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

export default ProjectDetailsSheet;
