import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { GetUserById } from "@/src/queries/users/get-user";
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
import { userSchema } from "./schema";

function UserDetailsSheet({
  open,
  onOpenChange,
  userId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}) {
  const { data, isLoading, isError } = useQuery(
    GetUserById(userId ?? "")
  );
  const [editMode, setEditMode] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
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
            User Details {userId ? `- ID: ${userId}` : ""}
          </SheetTitle>
        </SheetHeader>
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching user data</div>}
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
                    disabled={!editMode}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter user email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a valid email for your user.
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

export default UserDetailsSheet;