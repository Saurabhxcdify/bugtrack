// app/api/example/route.ts (or .js)


import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

function generateMockProjects(count = 10) {
  const projects = [];

  for (let i = 0; i < count; i++) {
    projects.push({
      id: faker.number.int({ min: 1, max: 1000000 }),
      name: faker.company.name(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      key_name: faker.helpers.slugify(faker.company.buzzPhrase()).toLowerCase(),
    });
  }

  return projects;
}


export async function GET(request: Request) {
    try {
      // Fetch data or perform any logic
      const mockProjects = generateMockProjects(10); // Generate 10 mock projects
      return NextResponse.json(
        {
          data: mockProjects, // The generated data for this page
          start: 0,
          end: 10,
          totalCount: 1000000, // Infinite-like large total count
        }
        , { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
  }
  
  export async function POST(request: Request) {
    try {
      const body = await request.json(); // Access the request body
      // Process the data (e.g., save to database)
      return NextResponse.json({ message: 'Data created', data: body }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Error creating data' }, { status: 500 });
    }
  }
  
  export async function PUT(request: Request) {
    try {
      const body = await request.json(); // Access the request body
      // Update the existing data (e.g., update in database)
      return NextResponse.json({ message: 'Data updated', data: body }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error updating data' }, { status: 500 });
    }
  }
  
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
  