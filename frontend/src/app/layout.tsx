import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

const SITE_URL = 'https://opvrenter.vercel.app';
const SITE_NAME = 'OnePoint Renter';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'OnePoint Renter | Bike & Scooter Rentals in Mirissa & Denipitiya, Sri Lanka',
    template: '%s | OnePoint Renter – Sri Lanka',
  },

  description:
    'Rent scooters & motorbikes in Mirissa, Denipitiya & Weligama with OnePoint Renter. Honda Dio, Yamaha Ray ZR, Royal Enfield, Pulsar & more. Fast WhatsApp booking, doorstep hotel delivery, 10-min deposit refund.',

  keywords: [
    'OnePoint Renter',
    'One Point Renter',
    'bike rental Mirissa',
    'scooter rental Mirissa',
    'bike rent Mirissa Sri Lanka',
    'motorbike hire Mirissa',
    'scooter hire Weligama',
    'bike rental Weligama',
    'bike rent Denipitiya',
    'scooter rental Sri Lanka',
    'rent a bike Sri Lanka',
    'motorcycle rental Sri Lanka',
    'rent scooter Mirissa',
    'cheap bike rental Sri Lanka',
    'WhatsApp bike booking Sri Lanka',
    'Royal Enfield rent Sri Lanka',
    'Honda Dio rent Mirissa',
    'Yamaha Ray ZR rental',
    'Bajaj Pulsar hire Sri Lanka',
    'Sri Lanka south coast bike tour',
    'beach scooter rental Sri Lanka',
    'tourist bike rental southern province',
    'bike hire southern Sri Lanka',
    'motorcycle tour Sri Lanka south',
    'scooter rental near beach Sri Lanka',
    'daily bike rental Sri Lanka',
  ],

  authors: [{ name: 'OnePoint Renter', url: SITE_URL }],
  creator: 'OnePoint Renter',
  publisher: 'OnePoint Renter',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'OnePoint Renter | Bike & Scooter Rentals – Mirissa, Denipitiya & Weligama',
    description:
      'Sri Lanka\'s most trusted scooter & bike rental service in Mirissa, Denipitiya & Weligama. Zero hidden fees, doorstep hotel delivery, instant WhatsApp confirmation. Book now!',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'OnePoint Renter – Bike & Scooter Rentals in Mirissa Sri Lanka',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'OnePoint Renter | Rent Bikes in Mirissa & Denipitiya, Sri Lanka',
    description:
      'Scooters, gear bikes & Royal Enfield rentals in Mirissa & Denipitiya. WhatsApp booking, doorstep delivery. Best value bike hire in Southern Sri Lanka.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },

  category: 'travel',

  verification: {
    google: 'd4d9c95bf75d01e2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'OnePoint Renter',
        alternateName: ['One Point Renter', 'OnePoint Bike Rentals'],
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
        description:
          'OnePoint Renter is Sri Lanka\'s most trusted motorbike and scooter rental service, operating from Mirissa and Denipitiya hubs in the Southern Province. We offer Honda Dio, Yamaha Ray ZR, Bajaj Pulsar, Royal Enfield and more with WhatsApp instant booking and hotel doorstep delivery.',
        telephone: '+94770000000',
        email: 'rentals@onepoint.lk',
        priceRange: 'LKR 2500 - LKR 7500 per day',
        currenciesAccepted: 'LKR, USD',
        paymentAccepted: 'Cash, Bank Transfer',
        openingHours: 'Mo-Su 06:00-21:00',
        areaServed: [
          { '@type': 'City', name: 'Mirissa' },
          { '@type': 'City', name: 'Weligama' },
          { '@type': 'City', name: 'Denipitiya' },
          { '@type': 'AdministrativeArea', name: 'Southern Province, Sri Lanka' },
        ],
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'Beach Road Hub',
            addressLocality: 'Mirissa',
            addressRegion: 'Southern Province',
            addressCountry: 'LK',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: 'Main Office & Workshop',
            addressLocality: 'Denipitiya',
            addressRegion: 'Southern Province',
            addressCountry: 'LK',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '5.9474',
          longitude: '80.4549',
        },
        hasMap: 'https://maps.google.com/?q=Mirissa,Sri+Lanka',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+94770000000',
          contactType: 'customer service',
          contactOption: 'TollFree',
          availableLanguage: ['English', 'Sinhala'],
        },
        sameAs: [
          `https://wa.me/94770000000`,
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '850',
          bestRating: '5',
          worstRating: '1',
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Honda Dio 110 Daily Rental',
            description: 'Automatic scooter rental per day in Mirissa & Denipitiya',
            price: '2500',
            priceCurrency: 'LKR',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'OnePoint Renter' },
          },
          {
            '@type': 'Offer',
            name: 'Royal Enfield Classic 350 Daily Rental',
            description: 'Adventure motorcycle rental per day in Mirissa',
            price: '7500',
            priceCurrency: 'LKR',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'OnePoint Renter' },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'OnePoint Renter',
        description: 'Sri Lanka Bike & Scooter Rentals – Mirissa, Denipitiya & Weligama',
        publisher: { '@id': `${SITE_URL}/#business` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I rent a bike in Mirissa, Sri Lanka?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Book instantly via WhatsApp at OnePoint Renter. Send a message with your dates, we confirm availability, and can deliver the bike directly to your hotel in Mirissa or Weligama.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the cheapest bike rental in Mirissa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Automatic scooters (Honda Dio, Yamaha Ray ZR) start from LKR 2,500 per day at OnePoint Renter – Mirissa and Denipitiya hubs. Weekly discounts are also available.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I rent a Royal Enfield in Mirissa Sri Lanka?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! OnePoint Renter offers Royal Enfield Classic 350 for LKR 7,500/day from our Mirissa hub. Book via WhatsApp with an IDP or Sri Lanka Driving License.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a driving license to rent a bike in Sri Lanka?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Sri Lankan residents need a valid Sri Lanka driving license. Foreign tourists need an International Driving Permit (IDP) endorsed by the Automobile Association of Ceylon (AAC).',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you deliver a bike to my hotel in Mirissa or Weligama?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! OnePoint Renter offers free doorstep delivery to hotels, villas, and guesthouses in Mirissa, Weligama, and Denipitiya. Just send your location on WhatsApp.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
