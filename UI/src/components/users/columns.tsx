"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TextWithTooltip from "@/components/custom/text-with-tooltip";

import { z } from "zod";

const userColumnSchema = z.object({
  id: z.number(),
  email: z.string().email(), // New attribute for email
  encrypted_password: z.string(), // New attribute for encrypted password
  reset_password_token: z.string().uuid(), // New attribute for reset password token
  reset_password_sent_at: z.string(), // New attribute for reset password sent time
  remember_created_at: z.string(), // New attribute for remember created time
  created_at: z.string(), // Existing attribute for creation date
  updated_at: z.string(), // Existing attribute for update date
  avatar: z.string(), // New attribute for user avatar
  username: z.string(), // New attribute for username
  name: z.string(), // Existing attribute for full name
  first_name: z.string(), // New attribute for first name
  last_name: z.string(), // New attribute for last name
  gender: z.string(), // New attribute for gender
  mobile_number: z.string(), // New attribute for mobile number
  role: z.enum(["Admin", "Developer", "Test Engineer", "Client", "Product Owner"]), // New attribute for user role
  is_active: z.boolean(), // New attribute for active status
  key_name: z.string(), // Existing attribute for key name
})

export const userColumns: ColumnDef<z.infer<typeof userColumnSchema>>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const value = row.getValue("id") as number;
      return (
        <TextWithTooltip className="font-mono max-w-[120px]" text={value.toString()} />
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const value = row.getValue("email") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "encrypted_password",
    header: "Encrypted Password",
    cell: ({ row }) => {
      const value = row.getValue("encrypted_password") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "reset_password_token",
    header: "Reset Password Token",
    cell: ({ row }) => {
      const value = row.getValue("reset_password_token") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "reset_password_sent_at",
    header: "Reset Password Sent At",
    cell: ({ row }) => {
      const value = row.getValue("reset_password_sent_at") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "remember_created_at",
    header: "Remember Created At",
    cell: ({ row }) => {
      const value = row.getValue("remember_created_at") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const value = row.getValue("updated_at") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const value = row.getValue("avatar") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const value = row.getValue("username") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => {
      const value = row.getValue("first_name") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => {
      const value = row.getValue("last_name") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const value = row.getValue("gender") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile Number",
    cell: ({ row }) => {
      const value = row.getValue("mobile_number") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const value = row.getValue("role") as string;
      return (
        <Badge
          className={`bg-${value.toLowerCase()} py-1 px-2 text-white rounded`}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => {
      const value = row.getValue("is_active") as boolean;
      return (
        <Badge
          className={`bg-${value ? "green" : "red"} py-1 px-2 text-white rounded`}
        >
          {value ? "Yes" : "No"}
        </Badge>
      );
    },
  },
];