import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// Function to generate a single mock ERP Sales Order record
const generateMockData = () => ({
  orderId: faker.string.uuid(), // Generate a UUID
  customerName: faker.person.fullName(), // Get a full name
  customerEmail: faker.internet.email(), // Get an email address
  customerPhone: faker.phone.number(), // Generate a phone number
  company: faker.company.name(), // Get a company name
  customerAddress: faker.location.streetAddress(), // Get a street address
  customerCity: faker.location.city(), // Get a city name
  customerCountry: faker.location.country(), // Get a country name
  productName: faker.commerce.productName(), // Get a product name
  productCategory: faker.commerce.department(), // Get a product category
  quantity: faker.number.int({ min: 1, max: 100 }), // Generate a quantity between 1 and 100
  price: faker.commerce.price({ min: 100, max: 1000, dec: 2, symbol: '$' }), // Generate a price
  orderStatus: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered', 'Cancelled']), // Choose a random status
  paymentStatus: faker.helpers.arrayElement(['Paid', 'Unpaid', 'Refunded']), // Choose a random payment status
  transactionDate: faker.date.past(), // Random past date
  deliveryDate: faker.date.future(), // Random future date
  shippingMethod: faker.helpers.arrayElement(['Standard', 'Express', 'Overnight']), // Choose a random shipping method
  totalAmount: faker.commerce.price({ min: 500, max: 5000, dec: 2, symbol: '$' }), // Generate a total amount
  currency: faker.finance.currencyCode(), // Get a currency code
  invoiceNumber: faker.string.numeric(10), // Generate a random 10-digit invoice number
});

// Handle the GET request
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1; // Current page
  const pageSize = Number(url.searchParams.get('pageSize')) || 10; // Records per page

  // Generate mock data for the current page
  const mockData = Array.from({ length: pageSize }, generateMockData); // Generate only the number of records requested by pageSize

  // Calculate start and end indexes for pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Return the paginated data along with start, end, and total count
  // Since we're generating infinite data, totalCount is omitted or can be set to some large arbitrary number for consistency.
  return NextResponse.json({
    data: mockData, // The generated data for this page
    start: start,
    end: end,
    totalCount: 1000000, // Infinite-like large total count
  });
}
