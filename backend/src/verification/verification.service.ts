import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentStatus } from '@prisma/client';

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async addDocument(bookingId: string, documentType: string, fileUrl: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    return this.prisma.verificationDocument.create({
      data: {
        bookingId,
        documentType,
        fileUrl,
        status: DocumentStatus.PENDING,
      },
    });
  }

  async getDocumentsForBooking(bookingId: string) {
    return this.prisma.verificationDocument.findMany({
      where: { bookingId },
    });
  }

  async updateDocumentStatus(documentId: string, status: DocumentStatus) {
    const doc = await this.prisma.verificationDocument.findUnique({
      where: { id: documentId },
    });

    if (!doc) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    return this.prisma.verificationDocument.update({
      where: { id: documentId },
      data: { status },
    });
  }
}
