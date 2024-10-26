"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TextWithTooltip from "@/components/custom/text-with-tooltip";

import { z } from "zod";
import Link from "next/link";

const projectColumnSchema = z.object({
    id: z.number(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    key_name: z.string(),
})

export const projectColumns: ColumnDef<z.infer<typeof projectColumnSchema>>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return (
        <Link 
          href={`/projects/${row.original.id}/details/open-releases`}
          onClick={(e) => e.stopPropagation()}
          className="hover:underline text-blue-500"
        >
          {value}
        </Link>
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
    accessorKey: "key_name",
    header: "Key Name",
    cell: ({ row }) => {
      const value = row.getValue("key_name") as string;
      return <TextWithTooltip className="font-mono max-w-[120px]" text={value} />;
    },
  },
];
