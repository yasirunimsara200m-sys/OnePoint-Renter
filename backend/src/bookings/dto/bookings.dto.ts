import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty({ example: 'bike-uuid-here' })
  @IsString()
  @IsNotEmpty()
  bikeId: string;

  @ApiProperty({ example: 'Kasun Perera' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: '+94771234567', description: 'WhatsApp contact number' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiPropertyOptional({ example: 'kasun@gmail.com' })
  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @ApiProperty({ example: '951234567V / N12345678' })
  @IsString()
  @IsNotEmpty()
  customerNicOrPassport: string;

  @ApiProperty({ example: 'B1234567' })
  @IsString()
  @IsNotEmpty()
  drivingLicenseNumber: string;

  @ApiProperty({ example: 'Colombo' })
  @IsString()
  @IsNotEmpty()
  pickupLocation: string;

  @ApiProperty({ example: 'Colombo' })
  @IsString()
  @IsNotEmpty()
  dropoffLocation: string;

  @ApiProperty({ example: '2026-12-01T09:00:00.000Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-12-04T18:00:00.000Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 2, description: 'Number of helmets requested (1 or 2)' })
  @IsInt()
  @Min(1)
  helmetsCount: number;

  @ApiPropertyOptional({ example: 'Need mobile phone holder and raincoat' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingStatusDto {
  @ApiProperty({ enum: BookingStatus })
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
