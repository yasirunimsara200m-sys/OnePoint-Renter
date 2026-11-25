import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'OnePoint Renter Serverless API',
    hubs: ['Denipitiya', 'Mirissa'],
    timestamp: new Date().toISOString(),
  });
}
