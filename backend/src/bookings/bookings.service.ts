import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/bookings.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private whatsappService: WhatsappService,
  ) {}

  async create(dto: CreateBookingDto, userId?: string) {
    const bike = await this.prisma.bike.findUnique({
      where: { id: dto.bikeId },
    });

    if (!bike) {
      throw new NotFoundException(`Bike with ID ${dto.bikeId} not found`);
    }

    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (end <= start) {
      throw new BadRequestException('End date must be after start date');
    }

    // Calculate duration in days
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const totalDays = Math.max(diffDays, 1);

    // Check for conflicting active bookings
    const conflict = await this.prisma.booking.findFirst({
      where: {
        bikeId: dto.bikeId,
        status: { in: ['CONFIRMED', 'ACTIVE'] },
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        ],
      },
    });

    if (conflict) {
      throw new BadRequestException(
        'This bike is already booked for the selected dates. Please choose different dates or another bike.',
      );
    }

    // Pricing calculation
    let dailyRate = bike.dailyRateLkr;
    // Apply weekly discount if 7+ days and weeklyRate is set
    if (totalDays >= 7 && bike.weeklyRateLkr) {
      dailyRate = bike.weeklyRateLkr / 7;
    }

    const baseRentalFee = dailyRate * totalDays;
    // 1st helmet included free, 2nd helmet is LKR 250/day
    const extraHelmets = Math.max(0, (dto.helmetsCount || 1) - 1);
    const helmetFee = extraHelmets * 250 * totalDays;
    const totalAmount = baseRentalFee + helmetFee;

    // Generate reference: OPR-YEAR-RANDOM
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const currentYear = new Date().getFullYear();
    const bookingReference = `OPR-${currentYear}-${randomCode}`;

    const booking = await this.prisma.booking.create({
      data: {
        bookingReference,
        bikeId: dto.bikeId,
        userId: userId || null,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        customerEmail: dto.customerEmail,
        customerNicOrPassport: dto.customerNicOrPassport,
        drivingLicenseNumber: dto.drivingLicenseNumber,
        pickupLocation: dto.pickupLocation,
        dropoffLocation: dto.dropoffLocation,
        startDate: start,
        endDate: end,
        totalDays,
        dailyRateLkr: dailyRate,
        helmetsCount: dto.helmetsCount || 1,
        helmetFeeLkr: helmetFee,
        totalAmountLkr: totalAmount,
        depositLkr: bike.depositLkr,
        notes: dto.notes,
        status: BookingStatus.PENDING,
      },
      include: {
        bike: true,
      },
    });

    // Generate WhatsApp direct reservation link
    const whatsappLink = this.whatsappService.generateCustomerBookingLink({
      bookingReference: booking.bookingReference,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      customerNicOrPassport: booking.customerNicOrPassport,
      bikeName: `${bike.brand} ${bike.name}`,
      plateNumber: bike.plateNumber,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalDays: booking.totalDays,
      pickupLocation: booking.pickupLocation,
      totalAmountLkr: booking.totalAmountLkr,
      depositLkr: booking.depositLkr,
      helmetsCount: booking.helmetsCount,
    });

    return {
      booking,
      whatsappLink,
      message: 'Booking created successfully. Use the WhatsApp link to confirm instantly.',
    };
  }

  async findAll(status?: BookingStatus) {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    return this.prisma.booking.findMany({
      where,
      include: {
        bike: true,
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        bike: true,
        documents: true,
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async findByReference(reference: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingReference: reference },
      include: {
        bike: true,
        documents: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with reference ${reference} not found`);
    }

    return booking;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.findOne(id);

    const updated = await this.prisma.booking.update({
      where: { id },
      data: {
        status: dto.status,
        notes: dto.notes ? `${booking.notes || ''}\n[Update]: ${dto.notes}` : booking.notes,
      },
      include: { bike: true },
    });

    // If marked ACTIVE, update bike status to RENTED
    if (dto.status === BookingStatus.ACTIVE) {
      await this.prisma.bike.update({
        where: { id: booking.bikeId },
        data: { status: 'RENTED' },
      });
    }

    // If marked COMPLETED or CANCELLED, set bike back to AVAILABLE
    if (dto.status === BookingStatus.COMPLETED || dto.status === BookingStatus.CANCELLED) {
      await this.prisma.bike.update({
        where: { id: booking.bikeId },
        data: { status: 'AVAILABLE' },
      });
    }

    // Prepare WhatsApp direct link for admin to notify customer
    let notifyMessage = `Hello ${booking.customerName}! Your booking ${booking.bookingReference} for ${booking.bike.name} has been updated to *${dto.status}*.`;
    if (dto.status === BookingStatus.CONFIRMED) {
      notifyMessage = `🎉 Hello ${booking.customerName}! Your booking *${booking.bookingReference}* for ${booking.bike.name} is *CONFIRMED*! Please bring your original Driving License and NIC/Passport at pickup (${booking.pickupLocation}). Contact us for any help.`;
    }

    const adminWhatsAppLink = this.whatsappService.generateAdminToCustomerLink(
      booking.customerPhone,
      notifyMessage,
    );

    return {
      booking: updated,
      adminWhatsAppLink,
    };
  }

  async getAdminStats() {
    const [totalBikes, availableBikes, totalBookings, pendingBookings, activeRentals, completedBookings] =
      await Promise.all([
        this.prisma.bike.count(),
        this.prisma.bike.count({ where: { status: 'AVAILABLE' } }),
        this.prisma.booking.count(),
        this.prisma.booking.count({ where: { status: 'PENDING' } }),
        this.prisma.booking.count({ where: { status: 'ACTIVE' } }),
        this.prisma.booking.findMany({
          where: { status: { in: ['CONFIRMED', 'ACTIVE', 'COMPLETED'] } },
          select: { totalAmountLkr: true },
        }),
      ]);

    const totalRevenueLkr = completedBookings.reduce((sum, b) => sum + b.totalAmountLkr, 0);

    return {
      totalBikes,
      availableBikes,
      totalBookings,
      pendingBookings,
      activeRentals,
      totalRevenueLkr,
    };
  }
}
