import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { BookingsModule } from './bookings/bookings.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    WhatsappModule,
    AuthModule,
    BikesModule,
    BookingsModule,
    VerificationModule,
  ],
})
export class AppModule {}
