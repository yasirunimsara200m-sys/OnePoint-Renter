import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to PostgreSQL database');
    } catch (error) {
      console.warn('⚠️ Could not connect to PostgreSQL immediately. Check DATABASE_URL in .env');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
