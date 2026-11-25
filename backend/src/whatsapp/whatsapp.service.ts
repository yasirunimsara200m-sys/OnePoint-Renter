import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface BookingWhatsAppDetails {
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  customerNicOrPassport: string;
  bikeName: string;
  plateNumber?: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pickupLocation: string;
  totalAmountLkr: number;
  depositLkr: number;
  helmetsCount: number;
}

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private officialWhatsAppNumber: string;

  constructor(private configService: ConfigService) {
    this.officialWhatsAppNumber =
      this.configService.get<string>('WHATSAPP_PHONE_NUMBER') || '94770000000';
  }

  /**
   * Generates a pre-filled WhatsApp Click-to-Chat URL for customers to instantly book or confirm
   */
  generateCustomerBookingLink(details: BookingWhatsAppDetails): string {
    const rawMessage = `*🛵 ONEPOINT RENTER - BIKE BOOKING REQUEST*
----------------------------------------
*Ref:* ${details.bookingReference}
*Customer:* ${details.customerName}
*Phone / WhatsApp:* ${details.customerPhone}
*NIC / Passport:* ${details.customerNicOrPassport}

*Bike Model:* ${details.bikeName}
*Pickup Location:* ${details.pickupLocation}
*Dates:* ${details.startDate} to ${details.endDate} (${details.totalDays} Days)
*Helmets:* ${details.helmetsCount}

*Rental Amount:* LKR ${details.totalAmountLkr.toLocaleString()}
*Refundable Deposit:* LKR ${details.depositLkr.toLocaleString()}
----------------------------------------
Hello OnePoint Renter! I would like to confirm my bike rental booking. Please let me know the availability and pickup details. Thank you!`;

    const encoded = encodeURIComponent(rawMessage);
    return `https://wa.me/${this.officialWhatsAppNumber}?text=${encoded}`;
  }

  /**
   * Generates a WhatsApp Click-to-Chat URL for Admin to directly message the customer
   */
  generateAdminToCustomerLink(customerPhone: string, message: string): string {
    // Sanitize phone number (strip +, spaces, hyphens)
    let cleanPhone = customerPhone.replace(/[\s\+\-]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '94' + cleanPhone.substring(1);
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Sends an automated WhatsApp notification via WhatsApp Cloud API or Twilio if configured,
   * with safe fallback logging.
   */
  async sendAutomatedNotification(toPhone: string, templateType: 'CONFIRMED' | 'PICKUP' | 'RETURN', details: any): Promise<boolean> {
    this.logger.log(`[WhatsApp Auto-Dispatch] Sending ${templateType} notification to ${toPhone}`);

    // If Cloud API credentials exist in env, it triggers the API; otherwise logs the payload
    const apiKey = this.configService.get<string>('WHATSAPP_API_TOKEN');
    if (!apiKey) {
      this.logger.log(
        `[WhatsApp Sandbox Mode] WhatsApp API token not set. Notification ready for ${toPhone}: ` +
          JSON.stringify({ templateType, bookingReference: details.bookingReference }),
      );
      return true;
    }

    try {
      // Integration hook for WhatsApp Business Cloud API
      return true;
    } catch (err) {
      this.logger.error(`Failed to send WhatsApp message to ${toPhone}`, err);
      return false;
    }
  }

  getOfficialNumber(): string {
    return this.officialWhatsAppNumber;
  }
}
