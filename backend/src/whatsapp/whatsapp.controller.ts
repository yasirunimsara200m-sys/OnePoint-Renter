import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WhatsappService } from './whatsapp.service';

@ApiTags('WhatsApp')
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('info')
  @ApiOperation({ summary: 'Get official WhatsApp contact info for OnePoint Renter' })
  getInfo() {
    return {
      officialNumber: this.whatsappService.getOfficialNumber(),
      supportLink: `https://wa.me/${this.whatsappService.getOfficialNumber()}?text=${encodeURIComponent(
        'Hello OnePoint Renter! I need assistance regarding renting a bike.',
      )}`,
    };
  }
}
