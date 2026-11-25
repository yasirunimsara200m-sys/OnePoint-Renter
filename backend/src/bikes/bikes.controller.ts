import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BikesService } from './bikes.service';
import { CreateBikeDto, FilterBikesDto, UpdateBikeDto } from './dto/bikes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { BikeStatus, Role } from '@prisma/client';

@ApiTags('Bikes & Fleet')
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  @ApiOperation({ summary: 'List all bikes with optional filters (Customer & Public)' })
  findAll(@Query() filter: FilterBikesDto) {
    return this.bikesService.findAll(filter);
  }

  @Get('locations')
  @ApiOperation({ summary: 'Get list of available rental hub locations in Sri Lanka' })
  getLocations() {
    return this.bikesService.getLocations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single bike details and active reservations' })
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new bike to the fleet (Admin only)' })
  create(@Body() createBikeDto: CreateBikeDto) {
    return this.bikesService.create(createBikeDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update bike details or pricing (Admin only)' })
  update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto) {
    return this.bikesService.update(id, updateBikeDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change bike availability status (AVAILABLE, RENTED, MAINTENANCE)' })
  updateStatus(@Param('id') id: string, @Body('status') status: BikeStatus) {
    return this.bikesService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a bike from the fleet (Admin only)' })
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id);
  }
}
