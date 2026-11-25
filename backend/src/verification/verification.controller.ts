import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { DocumentStatus, Role } from '@prisma/client';

@ApiTags('Verification & Documents')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post(':bookingId')
  @ApiOperation({ summary: 'Submit a verification document (NIC / Driving License / Passport)' })
  addDocument(
    @Param('bookingId') bookingId: string,
    @Body('documentType') documentType: string,
    @Body('fileUrl') fileUrl: string,
  ) {
    return this.verificationService.addDocument(bookingId, documentType, fileUrl);
  }

  @Get(':bookingId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get documents for a booking (Admin only)' })
  getDocuments(@Param('bookingId') bookingId: string) {
    return this.verificationService.getDocumentsForBooking(bookingId);
  }

  @Patch(':documentId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve or Reject verification document (Admin only)' })
  updateStatus(
    @Param('documentId') documentId: string,
    @Body('status') status: DocumentStatus,
  ) {
    return this.verificationService.updateDocumentStatus(documentId, status);
  }
}
