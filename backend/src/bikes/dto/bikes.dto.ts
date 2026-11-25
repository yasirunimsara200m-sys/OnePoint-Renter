import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BikeCategory, BikeStatus, TransmissionType } from '@prisma/client';

export class CreateBikeDto {
  @ApiProperty({ example: 'Honda Dio 110 Deluxe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Honda' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 2023 })
  @IsInt()
  @Min(2010)
  modelYear: number;

  @ApiProperty({ enum: BikeCategory, example: BikeCategory.SCOOTER })
  @IsEnum(BikeCategory)
  category: BikeCategory;

  @ApiProperty({ example: 110 })
  @IsInt()
  @Min(50)
  engineCapacity: number;

  @ApiProperty({ enum: TransmissionType, example: TransmissionType.AUTOMATIC })
  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @ApiProperty({ example: 2500, description: 'Daily rate in LKR' })
  @IsNumber()
  @Min(500)
  dailyRateLkr: number;

  @ApiPropertyOptional({ example: 15000, description: 'Weekly discounted rate in LKR' })
  @IsOptional()
  @IsNumber()
  weeklyRateLkr?: number;

  @ApiPropertyOptional({ example: 5000, description: 'Refundable security deposit in LKR' })
  @IsOptional()
  @IsNumber()
  depositLkr?: number;

  @ApiProperty({ example: 'Colombo' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'WP BCB-4521' })
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ example: ['Helmet Included', 'USB Charger', 'Mobile Phone Mount'] })
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional({ example: 'Fuel efficient scooter perfect for city commuting and beach hopping.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateBikeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  dailyRateLkr?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weeklyRateLkr?: number;

  @ApiPropertyOptional({ enum: BikeStatus })
  @IsOptional()
  @IsEnum(BikeStatus)
  status?: BikeStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

export class FilterBikesDto {
  @ApiPropertyOptional({ enum: BikeCategory })
  @IsOptional()
  @IsEnum(BikeCategory)
  category?: BikeCategory;

  @ApiPropertyOptional({ enum: TransmissionType })
  @IsOptional()
  @IsEnum(TransmissionType)
  transmission?: TransmissionType;

  @ApiPropertyOptional({ example: 'Mirissa' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ enum: BikeStatus })
  @IsOptional()
  @IsEnum(BikeStatus)
  status?: BikeStatus;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  maxDailyRate?: number;
}
