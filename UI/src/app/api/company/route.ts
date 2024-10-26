// app/api/companies/route.ts (or .js)

import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// Function to generate mock company data
function generateMockCompanies(count = 10) {
  const companies = [];

  for (let i = 0; i < count; i++) {
    companies.push({
      id: i + 1, // Simple ID generation
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });

  }

  return companies;
}

// GET API Route
export async function GET(request: Request) {
  try {
    const mockCompanies = generateMockCompanies(10); // Generate 10 mock companies
    return NextResponse.json(
      {
        data: mockCompanies, // The generated data for this page
        start: 0,
        end: 10,
        totalCount: 1000000, // Infinite-like large total count
      }
      , { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

// POST API Route
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Access the request body
    // Process the data (e.g., save to database)
    return NextResponse.json({ message: 'Data created', data: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating data' }, { status: 500 });
  }
}

// PUT API Route
export async function PUT(request: Request) {
  try {
    const body = await request.json(); // Access the request body
    // Update the existing data (e.g., update in database)
    return NextResponse.json({ message: 'Data updated', data: body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating data' }, { status: 500 });
  }
}

// DELETE API Route
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Assuming you pass an ID in the query string
    // Delete the data (e.g., remove from database)
    return NextResponse.json({ message: `Data with ID ${id} deleted` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting data' }, { status: 500 });
  }
}
