import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend and external requests
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('OnePoint Renter API')
    .setDescription(
      'Sri Lanka Bike & Scooter Rental Platform REST API with WhatsApp integration and Admin Panel',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Bikes & Fleet', 'Bikes catalog, filtering, and fleet management')
    .addTag('Bookings & Rentals', 'Reservation creation and status lifecycle')
    .addTag('WhatsApp', 'WhatsApp click-to-chat links and notifications')
    .addTag('Authentication', 'Admin and customer JWT authentication')
    .addTag('Verification & Documents', 'NIC, Driving License and Passport upload')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`\n======================================================`);
  console.log(`🚀 OnePoint Renter Backend is running on port: ${port}`);
  console.log(`📑 Swagger Documentation available at: http://localhost:${port}/api/docs`);
  console.log(`💬 WhatsApp Support Hook: https://wa.me/${process.env.WHATSAPP_PHONE_NUMBER || '94770000000'}`);
  console.log(`======================================================\n`);
}

bootstrap();
