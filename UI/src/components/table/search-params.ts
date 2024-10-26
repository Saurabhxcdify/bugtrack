import { ARRAY_DELIMITER, RANGE_DELIMITER, SLIDER_DELIMITER, SORT_DELIMITER } from "@/lib/delimiters";
import {
  createParser,
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsTimestamp,
  type inferParserType,
} from "nuqs/server"; // Import from 'nuqs/server' to avoid the "use client" directive



// Custom Sort Parser
export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split(SORT_DELIMITER);
    if (!id && !desc) return null;
    return { id, desc: desc === "desc" };
  },
  serialize(value) {
    return `${value.id}.${value.desc ? "desc" : "asc"}`;
  },
});

export const searchParamsParser = {
  // CUSTOM FILTERS BASED ON MOCK DATA SCHEMA
  orderId: parseAsString, // UUID for the order
  customerName: parseAsString, // String for customer name
  customerEmail: parseAsString, // Email validation
  customerPhone: parseAsString, // Phone number as string
  company: parseAsString, // Company name
  customerAddress: parseAsString, // Address string
  customerCity: parseAsString, // City string
  customerCountry: parseAsString, // Country string
  productName: parseAsString, // Product name
  productCategory: parseAsString, // Product category (department)
  quantity: parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER), // Quantity as integer range
  price: parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER), // Price range
  orderStatus: parseAsArrayOf(
    parseAsStringLiteral(["Pending", "Shipped", "Delivered", "Cancelled"]),
    ARRAY_DELIMITER
  ), // Enum for order status
  paymentStatus: parseAsArrayOf(
    parseAsStringLiteral(["Paid", "Unpaid", "Refunded"]),
    ARRAY_DELIMITER
  ), // Enum for payment status
  transactionDate: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER), // Date range for transaction date
  deliveryDate: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER), // Date range for delivery date
  shippingMethod: parseAsArrayOf(
    parseAsStringLiteral(["Standard", "Express", "Overnight"]),
    ARRAY_DELIMITER
  ), // Shipping method
  totalAmount: parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER), // Total amount range
  currency: parseAsString, // Currency code
  invoiceNumber: parseAsString, // 10-digit invoice number

  // TIMING FILTERS (from timingSchema)
  "timing.dns": parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
  "timing.connection": parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
  "timing.tls": parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
  "timing.ttfb": parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
  "timing.transfer": parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),

  // REQUIRED FOR SORTING & PAGINATION
  sort: parseAsSort,
  // size: parseAsInteger.withDefault(30),
  // start: parseAsInteger.withDefault(0),

  // REQUIRED FOR SELECTION
  uuid: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);

export const searchParamsSerializer = createSerializer(searchParamsParser);

export type SearchParamsType = inferParserType<typeof searchParamsParser>;
