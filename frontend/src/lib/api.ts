import { Bike, Booking, AdminStats, BikeCategory, TransmissionType } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
const DEFAULT_WHATSAPP = '94770000000';

export function getOfficialWhatsAppNumber(): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('opv_whatsapp_number');
      if (saved && saved.trim()) {
        let clean = saved.replace(/[\s\+\-]/g, '');
        if (clean.startsWith('0')) clean = '94' + clean.substring(1);
        return clean;
      }
    } catch (e) {
      // fallback
    }
  }
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP;
}

export function setOfficialWhatsAppNumber(number: string): string {
  let clean = number.replace(/[\s\+\-]/g, '');
  if (clean.startsWith('0')) clean = '94' + clean.substring(1);
  if (!clean) clean = DEFAULT_WHATSAPP;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('opv_whatsapp_number', clean);
      window.dispatchEvent(new Event('opv_whatsapp_updated'));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }
  return clean;
}

export function formatPhoneNumber(num?: string): string {
  const raw = num || getOfficialWhatsAppNumber();
  let clean = raw.replace(/[\s\+\-]/g, '');
  if (clean.startsWith('0')) clean = '94' + clean.substring(1);
  if (clean.length === 11 && clean.startsWith('94')) {
    return `+${clean.substring(0, 2)} ${clean.substring(2, 4)} ${clean.substring(4, 7)} ${clean.substring(7)}`;
  }
  return `+${clean}`;
}

export const fallbackBikes: Bike[] = [
  {
    id: 'bike-1',
    name: 'Honda Dio 110 Deluxe',
    brand: 'Honda',
    modelYear: 2023,
    category: 'SCOOTER',
    engineCapacity: 110,
    transmission: 'AUTOMATIC',
    dailyRateLkr: 2500,
    weeklyRateLkr: 15000,
    depositLkr: 5000,
    status: 'AVAILABLE',
    location: 'Mirissa',
    plateNumber: 'SP BDF-8821',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    features: ['1 Free Helmet', 'Fuel Efficient 50+ km/l', 'Mobile Phone Mount', 'Underseat Storage'],
    description: 'The undisputed king of South Coast scooters. Lightweight, extremely agile, and ideal for beach hopping between Mirissa, Denipitiya, and Weligama.',
  },
  {
    id: 'bike-2',
    name: 'Yamaha Ray ZR 125 Fi Hybrid',
    brand: 'Yamaha',
    modelYear: 2024,
    category: 'SCOOTER',
    engineCapacity: 125,
    transmission: 'AUTOMATIC',
    dailyRateLkr: 2800,
    weeklyRateLkr: 17000,
    depositLkr: 5000,
    status: 'AVAILABLE',
    location: 'Denipitiya',
    plateNumber: 'SP BDX-1290',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    features: ['1 Free Helmet', 'Hybrid Power Assist', 'USB Charger Port', 'Front Disc Brake'],
    description: 'Sporty styling with a modern 125cc fuel-injected engine. Excellent for coastal cruising around Mirissa beach, Secret Beach, and Denipitiya.',
  },
  {
    id: 'bike-3',
    name: 'TVS Ntorq 125 Race Edition',
    brand: 'TVS',
    modelYear: 2023,
    category: 'SCOOTER',
    engineCapacity: 125,
    transmission: 'AUTOMATIC',
    dailyRateLkr: 2700,
    weeklyRateLkr: 16500,
    depositLkr: 5000,
    status: 'AVAILABLE',
    location: 'Mirissa',
    plateNumber: 'SP BDW-6654',
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
    features: ['Bluetooth Display', 'Pass Switch', 'Double Helmet Option', 'High Pick-up'],
    description: 'Sharp ergonomics with powerful acceleration. Loved by surfers and tourists staying along Mirissa and Weligama bays.',
  },
  {
    id: 'bike-4',
    name: 'Yamaha FZ-S V3 ABS',
    brand: 'Yamaha',
    modelYear: 2023,
    category: 'GEAR_BIKE',
    engineCapacity: 150,
    transmission: 'MANUAL',
    dailyRateLkr: 3500,
    weeklyRateLkr: 22000,
    depositLkr: 7500,
    status: 'AVAILABLE',
    location: 'Denipitiya',
    plateNumber: 'SP BDT-3312',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    features: ['Single-Channel ABS', 'Radial Rear Tyre', 'LED Headlamp', 'Comfort Touring Seat'],
    description: 'Maximum stability and comfort for highway and coastal road cruising. Wide rear tyre provides superior grip in all weather conditions.',
  },
  {
    id: 'bike-5',
    name: 'Bajaj Pulsar 150 Neon',
    brand: 'Bajaj',
    modelYear: 2022,
    category: 'GEAR_BIKE',
    engineCapacity: 150,
    transmission: 'MANUAL',
    dailyRateLkr: 3200,
    weeklyRateLkr: 19500,
    depositLkr: 6000,
    status: 'AVAILABLE',
    location: 'Mirissa',
    plateNumber: 'SP BDR-4401',
    imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
    features: ['Twin Spark DTS-i', 'Front Disc Brake', 'Reliable Fuel Mileage', 'Durable Suspension'],
    description: 'Sri Lanka’s most trusted manual commuter motorcycle. Economical, rugged, and handles long rides down the southern coast effortlessly.',
  },
  {
    id: 'bike-6',
    name: 'Honda CB Hornet 160R',
    brand: 'Honda',
    modelYear: 2023,
    category: 'GEAR_BIKE',
    engineCapacity: 162,
    transmission: 'MANUAL',
    dailyRateLkr: 3600,
    weeklyRateLkr: 23000,
    depositLkr: 7500,
    status: 'AVAILABLE',
    location: 'Denipitiya',
    plateNumber: 'SP BDS-7729',
    imageUrl: 'https://images.unsplash.com/photo-1558980394-da06c6fae9c7?auto=format&fit=crop&w=800&q=80',
    features: ['Aggressive Naked Design', 'Rear Monoshock', 'Fat 140mm Rear Tyre', 'Dual Petal Discs'],
    description: 'Muscular street bike with confident road handling. Ideal for exploring inland trails around Denipitiya and the Matara coastline.',
  },
  {
    id: 'bike-7',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    modelYear: 2023,
    category: 'ADVENTURE',
    engineCapacity: 350,
    transmission: 'MANUAL',
    dailyRateLkr: 7500,
    weeklyRateLkr: 48000,
    depositLkr: 15000,
    status: 'AVAILABLE',
    location: 'Mirissa',
    plateNumber: 'SP BDX-0042',
    imageUrl: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80',
    features: ['Dual Channel ABS', 'Vintage Thump Sound', 'Touring Saddlebags Included', 'Heavy Cruiser'],
    description: 'The ultimate vintage cruiser for the breathtaking coastal breeze of Mirissa, Weligama, and southern beaches.',
  },
];

export async function fetchBikes(params?: {
  category?: BikeCategory;
  transmission?: TransmissionType;
  location?: string;
  maxDailyRate?: number;
}): Promise<Bike[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.transmission) query.append('transmission', params.transmission);
    if (params?.location && params.location !== 'All') query.append('location', params.location);
    if (params?.maxDailyRate) query.append('maxDailyRate', params.maxDailyRate.toString());

    const res = await fetch(`${API_BASE}/bikes?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch from API');
    const data = await res.json();
    return data.length ? data : fallbackBikes;
  } catch (err) {
    console.warn('Backend API unavailable, using cached fleet data:', err);
    let list = [...fallbackBikes];
    if (params?.category) list = list.filter((b) => b.category === params.category);
    if (params?.transmission) list = list.filter((b) => b.transmission === params.transmission);
    if (params?.location && params.location !== 'All') {
      list = list.filter((b) => b.location.toLowerCase() === params.location?.toLowerCase());
    }
    if (params?.maxDailyRate) list = list.filter((b) => b.dailyRateLkr <= params.maxDailyRate);
    return list;
  }
}

export async function createBooking(payload: any): Promise<{ booking: Booking; whatsappLink: string }> {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('API error, generating local WhatsApp link:', e);
  }

  const bookingRef = `OPR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const whatsappLink = generateDirectWhatsAppLink({
    ...payload,
    bookingReference: bookingRef,
  });

  return {
    booking: {
      ...payload,
      id: `local-${Date.now()}`,
      bookingReference: bookingRef,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    },
    whatsappLink,
  };
}

export function generateDirectWhatsAppLink(data: {
  bookingReference?: string;
  bikeName: string;
  customerName: string;
  customerPhone: string;
  customerNicOrPassport: string;
  pickupLocation: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmountLkr: number;
  depositLkr: number;
  helmetsCount: number;
}): string {
  const text = `*🛵 ONEPOINT RENTER - BIKE RESERVATION*
----------------------------------------
*Ref:* ${data.bookingReference || 'NEW-BOOKING'}
*Name:* ${data.customerName}
*Phone / WhatsApp:* ${data.customerPhone}
*NIC / Passport:* ${data.customerNicOrPassport}

*Bike:* ${data.bikeName}
*Pickup / Return Hub:* ${data.pickupLocation} (Denipitiya / Mirissa)
*Dates:* ${data.startDate} to ${data.endDate} (${data.totalDays} Days)
*Helmets:* ${data.helmetsCount}

*Total Rent:* LKR ${Number(data.totalAmountLkr).toLocaleString()}
*Deposit:* LKR ${Number(data.depositLkr).toLocaleString()}
----------------------------------------
Hello OnePoint Renter! I would like to reserve this bike in Denipitiya / Mirissa. Please confirm availability!`;

  const phone = getOfficialWhatsAppNumber();
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateQuickChatLink(customMessage?: string): string {
  const phone = getOfficialWhatsAppNumber();
  const msg = customMessage || 'Hello OnePoint Renter! I want to inquire about renting a bike/scooter in Denipitiya / Mirissa.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
