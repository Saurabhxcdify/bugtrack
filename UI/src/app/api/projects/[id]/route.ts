import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, you would fetch the company data from your database
    // For this example, we'll generate mock data
    const project = {
      id: parseInt(params.id),
      name: faker.company.name(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      key_name: faker.helpers.slugify(faker.company.catchPhrase().toLowerCase()),
    };

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching project data' }, { status: 500 });
  }
}