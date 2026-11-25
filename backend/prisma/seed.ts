import { PrismaClient, BikeCategory, TransmissionType, Role, BikeStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting OnePoint Renter Denipitiya & Mirissa database seeding...');

  // 1. Seed Admin User
  const adminEmail = 'admin@onepoint.lk';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@123', salt);

    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'OnePoint Admin',
        phone: '+94770000000',
        role: Role.ADMIN,
        passwordHash,
      },
    });
    console.log('✅ Admin user created: admin@onepoint.lk / Admin@123');
  }

  // 2. Seed Bikes for Denipitiya & Mirissa Hubs
  const sampleBikes = [
    {
      name: 'Honda Dio 110 Deluxe',
      brand: 'Honda',
      modelYear: 2023,
      category: BikeCategory.SCOOTER,
      engineCapacity: 110,
      transmission: TransmissionType.AUTOMATIC,
      dailyRateLkr: 2500,
      weeklyRateLkr: 15000,
      depositLkr: 5000,
      status: BikeStatus.AVAILABLE,
      location: 'Mirissa',
      plateNumber: 'SP BDF-8821',
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      features: ['1 Free Helmet', 'Fuel Efficient 50+ km/l', 'Mobile Phone Mount', 'Underseat Storage'],
      description: 'The undisputed king of South Coast scooters. Lightweight, extremely agile, and ideal for beach hopping between Mirissa, Denipitiya, and Weligama.',
    },
    {
      name: 'Yamaha Ray ZR 125 Fi Hybrid',
      brand: 'Yamaha',
      modelYear: 2024,
      category: BikeCategory.SCOOTER,
      engineCapacity: 125,
      transmission: TransmissionType.AUTOMATIC,
      dailyRateLkr: 2800,
      weeklyRateLkr: 17000,
      depositLkr: 5000,
      status: BikeStatus.AVAILABLE,
      location: 'Denipitiya',
      plateNumber: 'SP BDX-1290',
      imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      features: ['1 Free Helmet', 'Hybrid Power Assist', 'USB Charger Port', 'Front Disc Brake'],
      description: 'Sporty look with modern 125cc fuel-injected engine. Excellent for South Coast exploration around Mirissa beach, Secret Beach, and Denipitiya.',
    },
    {
      name: 'TVS Ntorq 125 Race Edition',
      brand: 'TVS',
      modelYear: 2023,
      category: BikeCategory.SCOOTER,
      engineCapacity: 125,
      transmission: TransmissionType.AUTOMATIC,
      dailyRateLkr: 2700,
      weeklyRateLkr: 16500,
      depositLkr: 5000,
      status: BikeStatus.AVAILABLE,
      location: 'Mirissa',
      plateNumber: 'SP BDW-6654',
      imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
      features: ['Bluetooth Display', 'Pass Switch', 'Double Helmet Option', 'High Pick-up'],
      description: 'Sharp styling with powerful acceleration. Loved by surfers and tourists staying along Mirissa and Weligama bays.',
    },
    {
      name: 'Yamaha FZ-S V3 ABS',
      brand: 'Yamaha',
      modelYear: 2023,
      category: BikeCategory.GEAR_BIKE,
      engineCapacity: 150,
      transmission: TransmissionType.MANUAL,
      dailyRateLkr: 3500,
      weeklyRateLkr: 22000,
      depositLkr: 7500,
      status: BikeStatus.AVAILABLE,
      location: 'Denipitiya',
      plateNumber: 'SP BDT-3312',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      features: ['Single-Channel ABS', 'Radial Rear Tyre', 'LED Headlamp', 'Comfort Touring Seat'],
      description: 'Maximum stability and comfort for coastal road cruising. Wide rear tyre provides superior grip in all weather conditions.',
    },
    {
      name: 'Bajaj Pulsar 150 Neon',
      brand: 'Bajaj',
      modelYear: 2022,
      category: BikeCategory.GEAR_BIKE,
      engineCapacity: 150,
      transmission: TransmissionType.MANUAL,
      dailyRateLkr: 3200,
      weeklyRateLkr: 19500,
      depositLkr: 6000,
      status: BikeStatus.AVAILABLE,
      location: 'Mirissa',
      plateNumber: 'SP BDR-4401',
      imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
      features: ['Twin Spark DTS-i', 'Front Disc Brake', 'Rugged Coastal Riding', 'Durable Suspension'],
      description: 'Sri Lanka’s most trusted manual motorcycle. Economical, rugged, and handles long rides along the southern coast effortlessly.',
    },
    {
      name: 'Honda CB Hornet 160R',
      brand: 'Honda',
      modelYear: 2023,
      category: BikeCategory.GEAR_BIKE,
      engineCapacity: 162,
      transmission: TransmissionType.MANUAL,
      dailyRateLkr: 3600,
      weeklyRateLkr: 23000,
      depositLkr: 7500,
      status: BikeStatus.AVAILABLE,
      location: 'Denipitiya',
      plateNumber: 'SP BDS-7729',
      imageUrl: 'https://images.unsplash.com/photo-1558980394-da06c6fae9c7?auto=format&fit=crop&w=800&q=80',
      features: ['Aggressive Naked Design', 'Rear Monoshock', 'Fat 140mm Rear Tyre', 'Dual Petal Discs'],
      description: 'Muscular street bike with confident road handling. Ideal for exploring inland trails around Denipitiya and the Matara coastline.',
    },
    {
      name: 'Royal Enfield Classic 350',
      brand: 'Royal Enfield',
      modelYear: 2023,
      category: BikeCategory.ADVENTURE,
      engineCapacity: 350,
      transmission: TransmissionType.MANUAL,
      dailyRateLkr: 7500,
      weeklyRateLkr: 48000,
      depositLkr: 15000,
      status: BikeStatus.AVAILABLE,
      location: 'Mirissa',
      plateNumber: 'SP BDX-0042',
      imageUrl: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80',
      features: ['Dual Channel ABS', 'Vintage Thump Sound', 'Touring Saddlebags Included', 'Heavy Cruiser'],
      description: 'The ultimate vintage cruiser for the breathtaking coastal breeze of Mirissa, Weligama, and southern beaches.',
    },
  ];

  for (const b of sampleBikes) {
    await prisma.bike.upsert({
      where: { plateNumber: b.plateNumber },
      update: b,
      create: b,
    });
  }

  console.log(`✅ Seeded ${sampleBikes.length} bikes & scooters for Denipitiya & Mirissa.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
