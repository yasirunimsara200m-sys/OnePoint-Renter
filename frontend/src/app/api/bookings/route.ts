import { NextResponse } from 'next/server';
import { generateDirectWhatsAppLink } from '../../../lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const bookingRef = `OPR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const booking = {
      id: `booking-${Date.now()}`,
      bookingReference: bookingRef,
      bikeId: body.bikeId,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail || '',
      customerNicOrPassport: body.customerNicOrPassport,
      drivingLicenseNumber: body.drivingLicenseNumber || '',
      pickupLocation: body.pickupLocation || 'Denipitiya',
      dropoffLocation: body.dropoffLocation || 'Denipitiya',
      startDate: body.startDate,
      endDate: body.endDate,
      totalDays: Number(body.totalDays) || 1,
      dailyRateLkr: Number(body.dailyRateLkr) || 2500,
      helmetsCount: Number(body.helmetsCount) || 1,
      helmetFeeLkr: Number(body.helmetFeeLkr) || 0,
      totalAmountLkr: Number(body.totalAmountLkr) || 2500,
      depositLkr: Number(body.depositLkr) || 5000,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const whatsappLink = generateDirectWhatsAppLink({
      bookingReference: bookingRef,
      bikeName: body.bikeName || 'Bike',
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerNicOrPassport: body.customerNicOrPassport,
      pickupLocation: body.pickupLocation,
      startDate: body.startDate,
      endDate: body.endDate,
      totalDays: Number(body.totalDays) || 1,
      totalAmountLkr: Number(body.totalAmountLkr) || 2500,
      depositLkr: Number(body.depositLkr) || 5000,
      helmetsCount: Number(body.helmetsCount) || 1,
    });

    return NextResponse.json({ booking, whatsappLink }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
