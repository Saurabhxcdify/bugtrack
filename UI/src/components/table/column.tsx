"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnSchema } from "./schema";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TextWithTooltip from "@/components/custom/text-with-tooltip";

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "id",
    header: "Company ID",
    cell: ({ row }) => {
      const value = row.getValue("id") as string;
      return (
        <TextWithTooltip className="font-mono max-w-[120px]" text={value} />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description") as string;
      return <div>{value}</div>;
    },
   

  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string;
      return <div>{value}</div>;
    }
  },
    {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const value = row.getValue("updated_at") as string;
        return <div>{value}</div>;
      }
    }
  
];