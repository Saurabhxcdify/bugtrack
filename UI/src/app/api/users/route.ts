// app/api/users/route.ts (or .js)

import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// Function to generate mock user data
function generateMockUsers(count = 10) {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1, // Simple ID generation
      email: faker.internet.email(),
      encrypted_password: faker.internet.password(), // Simulate encrypted password
      reset_password_token: faker.string.uuid(),
      reset_password_sent_at: faker.date.recent(),
      remember_created_at: faker.date.recent(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      name: faker.person.fullName(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      gender: faker.name.gender(),
      mobile_number: faker.phone.number(),
      role: faker.helpers.arrayElement(["Admin", "Developer", "Test Engineer", "Client", "Product Owner"]),
      is_active: faker.datatype.boolean(),
    });
  }

  return users;
}

// GET API Route
export async function GET(request: Request) {
  try {
    const mockUsers = generateMockUsers(10); // Generate 10 mock users
    return NextResponse.json(

      {
        data: mockUsers,
        start: 0,
        end: 10,
        totalCount: 1000000
      },
      { status: 200 });
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
