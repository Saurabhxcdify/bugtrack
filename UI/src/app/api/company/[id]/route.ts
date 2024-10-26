import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, you would fetch the company data from your database
    // For this example, we'll generate mock data
    const company = {
      id: params.id,
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    };

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching company data' }, { status: 500 });
  }
}