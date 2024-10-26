"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import TextWithTooltip from "@/components/custom/text-with-tooltip";

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => {
      const value = row.getValue("orderId") as string;
      return (
        <TextWithTooltip className="font-mono max-w-[120px]" text={value} />
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => {
      const value = row.getValue("customerName") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
    cell: ({ row }) => {
      const value = row.getValue("customerEmail") as string;
      return (
        <TextWithTooltip className="font-mono max-w-[120px]" text={value} />
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const value = row.getValue("productName") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const value = row.getValue("quantity") as number;
      return <div className="font-mono">{value}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const value = row.getValue("totalAmount") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const value = row.getValue("orderStatus") as string;
      return (
        <Badge
          variant="outline"
          className={`${
            value === "Cancelled" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const value = row.getValue("paymentStatus") as string;
      return (
        <Badge
          variant="outline"
          className={`${
            value === "Paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      const value = row.getValue("transactionDate") as string;
      return (
        <div className="font-mono whitespace-nowrap">
          {format(new Date(value), "LLL dd, y HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
    cell: ({ row }) => {
      const value = row.getValue("shippingMethod") as string;
      return <div>{value}</div>;
    },
  },
];