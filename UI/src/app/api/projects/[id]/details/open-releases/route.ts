// app/api/projects/[projectId]/details/open-releases/route.ts

import { faker } from '@faker-js/faker';
import { NextRequest, NextResponse } from 'next/server';

type OpenRelease = {
  id: number;
  name: string;
  description: string;
  appVersion: string;
  startDate: string;
  endDate: string;
  status: 'Open' | 'In Progress';
};

type ApiResponse = {
  data: OpenRelease[];
  start: number;
  end: number;
  totalCount: number;
};

// Ensure deterministic data based on index
function generateRelease(index: number): OpenRelease {
  // Seed the faker instance for this index to get consistent results
  faker.seed(index);
  
  const startDate = faker.date.future();
  const endDate = faker.date.between({
    from: startDate,
    to: new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000) // Up to 90 days after start
  });
  
  return {
    id: index + 1,
    name: `Release ${faker.number.int({ min: 1000, max: 9999 })}`,
    description: faker.lorem.sentence(4),
    appVersion: `${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({ min: 0, max: 99 })}`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    status: faker.helpers.arrayElement(['Open', 'In Progress']),
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  console.log('API Route Handler Started');
  
  try {
    const { searchParams } = new URL(req.url);
    
    // Parse and validate query parameters
    const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
    const pageSize = Math.max(1, Math.min(100, Number(searchParams.get('pageSize') ?? '50')));
    
    console.log('Request parameters:', { 
      page, 
      pageSize, 
      projectId: params.projectId 
    });

    // Calculate pagination values
    const start = (page - 1) * pageSize;
    const totalCount = 10000; // Total number of possible releases
    const itemsToGenerate = Math.min(pageSize, totalCount - start);

    console.log('Generating data:', { 
      start, 
      itemsToGenerate, 
      totalCount 
    });

    // Generate data using faker with index-based seeding
    const data = Array.from(
      { length: Math.max(0, itemsToGenerate) },
      (_, i) => generateRelease(start + i)
    );

    const response: ApiResponse = {
      data,
      start,
      end: start + data.length,
      totalCount,
    };

    console.log('Sending response:', { 
      dataLength: data.length, 
      start: response.start, 
      end: response.end 
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in API route:', error);
    
    return NextResponse.json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? 
        error instanceof Error ? error.stack : undefined 
        : undefined
    }, { 
      status: 500 
    });
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}