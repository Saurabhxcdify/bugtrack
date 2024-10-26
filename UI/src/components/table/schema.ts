import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
} from "@/src/lib/delimiters";
import { METHODS } from "@/src/constants/method";
import { REGIONS } from "@/src/constants/region";
import { z } from "zod";

// https://github.com/colinhacks/zod/issues/2985#issue-2008642190
const stringToBoolean = z
  .string()
  .toLowerCase()
  .transform((val) => {
    try {
      return JSON.parse(val);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  })
  .pipe(z.boolean().optional());
  export const timingSchema = z.object({
    "timing.dns": z.number().optional(), // Optional numeric field for DNS timing
    "timing.connection": z.number().optional(), // Optional numeric field for connection timing
    "timing.tls": z.number().optional(), // Optional numeric field for TLS timing
    "timing.ttfb": z.number().optional(), // Optional numeric field for TTFB timing
    "timing.transfer": z.number().optional(), // Optional numeric field for transfer timing
  });
  
  export const columnSchema = z
    .object({
      orderId: z.string().uuid(), // UUID for orderId
      customerName: z.string(), // Full name as string
      customerEmail: z.string().email(), // Email validation
      customerPhone: z.string(), // Phone number as string
      company: z.string(), // Company name
      customerAddress: z.string(), // Address as string
      customerCity: z.string(), // City name
      customerCountry: z.string(), // Country name
      productName: z.string(), // Product name
      productCategory: z.string(), // Product category (department)
      quantity: z.coerce.number().min(1).max(100), // Quantity between 1 and 100
      price: z
        .string()
        .transform((val) => parseFloat(val.replace('$', ''))), // Convert string price to a number
      orderStatus: z
        .enum(['Pending', 'Shipped', 'Delivered', 'Cancelled']), // Enum for order status
      paymentStatus: z
        .enum(['Paid', 'Unpaid', 'Refunded']), // Enum for payment status
      transactionDate: z.coerce.date(), // Past date
      deliveryDate: z.coerce.date(), // Future date
      shippingMethod: z
        .enum(['Standard', 'Express', 'Overnight']), // Enum for shipping method
      totalAmount: z
        .string()
        .transform((val) => parseFloat(val.replace('$', ''))), // Convert string totalAmount to number
      currency: z.string(), // Currency code
      invoiceNumber: z.string().length(10), // 10-digit numeric string
      pathname: z.string().optional(),
    })
    .merge(timingSchema); // Merge timingSchema to add timing fields
  

export type ColumnSchema = z.infer<typeof columnSchema>;
export type TimingSchema = z.infer<typeof timingSchema>;

export const columnFilterSchema = z.object({
  orderId: z.string().uuid().optional(), // UUID for orderId
  customerName: z.string().optional(), // Full name as a string
  customerEmail: z.string().email().optional(), // Email validation
  customerPhone: z.string().optional(), // Phone number as string
  company: z.string().optional(), // Company name
  customerAddress: z.string().optional(), // Address as string
  customerCity: z.string().optional(), // City name
  customerCountry: z.string().optional(), // Country name
  productName: z.string().optional(), // Product name
  productCategory: z.string().optional(), // Product category (department)
  quantity: z.coerce.number().min(1).max(100).optional(), // Quantity between 1 and 100
  price: z
    .string()
    .transform((val) => parseFloat(val.replace('$', ''))) // Convert string price to a number
    .optional(),
  orderStatus: z
    .enum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
    .optional(), // Enum for order status
  paymentStatus: z
    .enum(['Paid', 'Unpaid', 'Refunded'])
    .optional(), // Enum for payment status
  transactionDate: z.coerce.date().optional(), // Past date
  deliveryDate: z.coerce.date().optional(), // Future date
  shippingMethod: z
    .enum(['Standard', 'Express', 'Overnight'])
    .optional(), // Enum for shipping method
  totalAmount: z
    .string()
    .transform((val) => parseFloat(val.replace('$', ''))) // Convert string totalAmount to number
    .optional(),
  currency: z.string().optional(), // Currency code
  invoiceNumber: z.string().length(10).optional(), // 10-digit numeric string
});


export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;
