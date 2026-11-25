import { NextResponse } from 'next/server';
import { fallbackBikes } from '../../../lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const transmission = searchParams.get('transmission');
    const location = searchParams.get('location');
    const maxDailyRate = searchParams.get('maxDailyRate');

    let bikes = [...fallbackBikes];

    if (category && category !== 'ALL') {
      bikes = bikes.filter((b) => b.category === category);
    }

    if (transmission && transmission !== 'ALL') {
      bikes = bikes.filter((b) => b.transmission === transmission);
    }

    if (location && location !== 'ALL' && location !== 'All') {
      bikes = bikes.filter((b) => b.location.toLowerCase() === location.toLowerCase());
    }

    if (maxDailyRate) {
      const rate = Number(maxDailyRate);
      if (!isNaN(rate)) {
        bikes = bikes.filter((b) => b.dailyRateLkr <= rate);
      }
    }

    return NextResponse.json(bikes, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching bikes:', error);
    return NextResponse.json(fallbackBikes, { status: 200 });
  }
}
