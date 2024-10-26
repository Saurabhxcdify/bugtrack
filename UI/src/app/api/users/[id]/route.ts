import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, you would fetch the company data from your database
    // For this example, we'll generate mock data
    const user = {
        id: params.id,
        email: faker.internet.email(),
        encrypted_password: faker.internet.password(), // Simulate encrypted password
        reset_password_token: faker.string.uuid(),
        reset_password_sent_at: faker.date.recent().toISOString(),
        remember_created_at: faker.date.recent().toISOString(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        gender: faker.name.gender(),
        mobile_number: faker.phone.number(),
        role: faker.helpers.arrayElement(["Admin", "Developer", "Test Engineer", "Client", "Product Owner"]),
        is_active: faker.datatype.boolean(),
      };

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
  }
}