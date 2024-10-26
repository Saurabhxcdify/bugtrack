"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TextWithTooltip from "@/components/custom/text-with-tooltip";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import Link from "next/link";

const releaseColumnSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    appVersion: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(["Open", "In Progress"]),
});

export const releaseColumns: ColumnDef<z.infer<typeof releaseColumnSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return (
        <Link 
          href={`/projects/${row.original.id}/releases/${row.original.id}`}
          onClick={(e) => e.stopPropagation()}
          className="hover:underline text-blue-500"
        >
          <TextWithTooltip className="max-w-[150px]" text={value} />
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description") as string;
      return <TextWithTooltip className="max-w-[200px]" text={value} />;
    },
  },
  {
    accessorKey: "appVersion",
    header: "App Version",
    cell: ({ row }) => {
      const value = row.getValue("appVersion") as string;
      return <span className="font-mono">{value}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const value = row.getValue("startDate") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y")}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const value = row.getValue("endDate") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      return <Badge>{value}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
