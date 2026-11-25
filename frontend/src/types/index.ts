export type BikeCategory = 'SCOOTER' | 'GEAR_BIKE' | 'ADVENTURE';
export type TransmissionType = 'AUTOMATIC' | 'MANUAL';
export type BikeStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface Bike {
  id: string;
  name: string;
  brand: string;
  modelYear: number;
  category: BikeCategory;
  engineCapacity: number;
  transmission: TransmissionType;
  dailyRateLkr: number;
  weeklyRateLkr?: number;
  depositLkr: number;
  status: BikeStatus;
  location: string;
  plateNumber: string;
  imageUrl: string;
  features: string[];
  description?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  bikeId: string;
  bike: Bike;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerNicOrPassport: string;
  drivingLicenseNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRateLkr: number;
  helmetsCount: number;
  helmetFeeLkr: number;
  totalAmountLkr: number;
  depositLkr: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface AdminStats {
  totalBikes: number;
  availableBikes: number;
  totalBookings: number;
  pendingBookings: number;
  activeRentals: number;
  totalRevenueLkr: number;
}
