import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, you would fetch the release data from your database
    // For this example, we'll generate mock data
    const startDate = faker.date.future();
    const release = {
      id: params.id,
      name: `Release ${faker.number.int({ min: 1, max: 100 })}`,
      description: faker.lorem.sentence(),
      appVersion: `${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({ min: 0, max: 9 })}`,
      startDate: startDate.toISOString(),
      endDate: faker.date.between({ from: startDate, to: faker.date.future() }).toISOString(),
      status: faker.helpers.arrayElement(['Open', 'In Progress']),
    };

    return NextResponse.json(release, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching release data' }, { status: 500 });
  }
}

