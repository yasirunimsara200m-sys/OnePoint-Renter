import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

export const metadata: Metadata = {
  title: 'OnePoint Renter | Rent Bikes & Scooters in Sri Lanka',
  description:
    'Best motorbike and scooter rental in Sri Lanka. Automatic scooters, gear bikes, Royal Enfield touring motorcycles. Easy booking via WhatsApp with instant confirmation.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  keywords: [
    'Sri Lanka bike rent',
    'scooter rental Colombo',
    'rent bike Mirissa',
    'scooter hire Weligama',
    'OnePoint Renter',
    'motorcycle hire Sri Lanka',
    'rent scooter Sri Lanka WhatsApp',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between selection:bg-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
