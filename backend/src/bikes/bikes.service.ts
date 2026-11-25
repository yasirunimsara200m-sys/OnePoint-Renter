import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto, FilterBikesDto, UpdateBikeDto } from './dto/bikes.dto';
import { BikeStatus } from '@prisma/client';

@Injectable()
export class BikesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBikeDto) {
    const existing = await this.prisma.bike.findUnique({
      where: { plateNumber: dto.plateNumber.toUpperCase() },
    });

    if (existing) {
      throw new ConflictException(`Bike with plate ${dto.plateNumber} already exists`);
    }

    return this.prisma.bike.create({
      data: {
        ...dto,
        plateNumber: dto.plateNumber.toUpperCase(),
        features: dto.features || ['1 Helmet Included', 'Third Party Insurance', 'Mobile Mount'],
      },
    });
  }

  async findAll(filter?: FilterBikesDto) {
    const where: any = {};

    if (filter?.category) {
      where.category = filter.category;
    }
    if (filter?.transmission) {
      where.transmission = filter.transmission;
    }
    if (filter?.location) {
      where.location = { contains: filter.location, mode: 'insensitive' };
    }
    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.maxDailyRate) {
      where.dailyRateLkr = { lte: Number(filter.maxDailyRate) };
    }

    return this.prisma.bike.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            status: { in: ['CONFIRMED', 'ACTIVE'] },
            endDate: { gte: new Date() },
          },
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }

    return bike;
  }

  async update(id: string, dto: UpdateBikeDto) {
    await this.findOne(id);
    return this.prisma.bike.update({
      where: { id },
      data: dto,
    });
  }

  async updateStatus(id: string, status: BikeStatus) {
    await this.findOne(id);
    return this.prisma.bike.update({
      where: { id },
      data: { status },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.bike.delete({
      where: { id },
    });
  }

  async getLocations() {
    const locations = await this.prisma.bike.findMany({
      select: { location: true },
      distinct: ['location'],
    });
    return locations.map((l) => l.location);
  }
}
