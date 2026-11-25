'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Bike } from '../types';
import { fetchBikes, fallbackBikes, generateQuickChatLink } from '../lib/api';
import BikeCard from '../components/BikeCard';
import BookingModal from '../components/BookingModal';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Compass,
  ArrowRight,
  MessageCircle,
  Star,
  Camera,
  HeartHandshake,
  Clock,
  Navigation,
  ThumbsUp,
  Fuel,
  Sun,
  Waves,
  Mountain,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const [bikes, setBikes] = useState<Bike[]>(fallbackBikes);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookingBike, setActiveBookingBike] = useState<Bike | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchBikes();
        setBikes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredBikes = useMemo(() => {
    return bikes.filter((b) => {
      const matchCategory =
        selectedCategory === 'ALL' || b.category === selectedCategory;
      const matchLocation =
        selectedLocation === 'ALL' ||
        b.location.toLowerCase() === selectedLocation.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLocation && matchSearch;
    });
  }, [bikes, selectedCategory, selectedLocation, searchQuery]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 selection:bg-orange-500 selection:text-white">
      
      {/* 1. HERO SECTION WITH CLEARLY VISIBLE SCENIC BACKGROUND IMAGE */}
      <section className="relative overflow-hidden text-white pt-12 pb-20 sm:pt-20 sm:pb-32 min-h-[580px] sm:min-h-[660px] flex items-center">
        
        {/* CLEARLY VISIBLE BACKGROUND IMAGE WITH LIGHT TRANSLUCENT OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000&q=90"
            alt="Sri Lanka Coastal Scooter Ride"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle translucent dark overlay so the photo is 100% visible while text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 w-full">
          
          {/* Top Live Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-white">Denipitiya & Mirissa Hubs Open</span>
              <span className="text-orange-400 font-bold hidden sm:inline">• ⚡ Fast WhatsApp Handover</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-400 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full backdrop-blur-md shadow-md">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="font-bold text-white ml-0.5">4.9 / 5</span>
              <span className="text-slate-300 ml-0.5">(850+ reviews)</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="max-w-3xl space-y-3 sm:space-y-6">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Feel the ocean breeze.{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Explore Mirissa & Denipitiya
              </span>{' '}
              on two wheels.
            </h1>

            <p className="text-sm sm:text-xl text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Rent clean, reliable scooters & gear bikes from our Denipitiya and Mirissa hubs. Zero hidden charges, free phone mounts, and doorstep hotel delivery.
            </p>
          </div>

          {/* 4 Guarantees (2-column on mobile, 4-col on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 text-slate-200">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px] sm:text-xs">No Scam Guarantee</p>
                <p className="text-slate-400 text-[9px] sm:text-[11px] hidden sm:block">We photograph scratches together</p>
              </div>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px] sm:text-xs">10-Min Deposit Return</p>
                <p className="text-slate-400 text-[9px] sm:text-[11px] hidden sm:block">Instant refund upon return</p>
              </div>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px] sm:text-xs">Certified Helmets</p>
                <p className="text-slate-400 text-[9px] sm:text-[11px] hidden sm:block">Sanitized with clear visors</p>
              </div>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-[11px] sm:text-xs">Free Phone Mount</p>
                <p className="text-slate-400 text-[9px] sm:text-[11px] hidden sm:block">Google Maps navigation ready</p>
              </div>
            </div>
          </div>

          {/* Search & Filter Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl text-slate-900 border border-slate-100 mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
              
              {/* Category */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  1. Vehicle Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Bikes & Scooters</option>
                  <option value="SCOOTER">Automatic Scooters (Dio, RayZR)</option>
                  <option value="GEAR_BIKE">Manual Gear Bikes (FZ-S, Pulsar)</option>
                  <option value="ADVENTURE">Adventure Cruiser (Royal Enfield)</option>
                </select>
              </div>

              {/* Hub Location */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  2. Rental Hub Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">All Hubs (Denipitiya & Mirissa)</option>
                  <option value="Denipitiya">Denipitiya (Main Office Hub)</option>
                  <option value="Mirissa">Mirissa (Beach Hub)</option>
                </select>
              </div>

              {/* Search by model */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  3. Search Bike Model
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Dio, RayZR, FZ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-9 pr-3 py-2.5 sm:pl-10 sm:pr-3.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-3 sm:top-3.5" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. FLEET SHOWCASE: 2-COLUMNS ON MOBILE (grid-cols-2) */}
      <section id="fleet" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available in Denipitiya & Mirissa</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pick Your Ride
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Certified sanitized helmets and free phone mounts with every rental.
            </p>
          </div>

          {/* Category Filter Pills (Horizontal scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 -mx-1 px-1">
            {[
              { id: 'ALL', label: 'All Bikes' },
              { id: 'SCOOTER', label: '🛵 Scooters' },
              { id: 'GEAR_BIKE', label: '🏍️ Gear Bikes' },
              { id: 'ADVENTURE', label: '⛰️ Cruiser' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`text-[11px] sm:text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-CARDS PER ROW ON MOBILE (grid-cols-2), 3 ON TABLET, 4 ON DESKTOP */}
        {filteredBikes.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl sm:rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm font-medium">No bikes found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedLocation('ALL');
                setSearchQuery('');
              }}
              className="mt-2 text-xs sm:text-sm text-orange-600 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredBikes.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                onBookNow={(b) => setActiveBookingBike(b)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. WHY RIDERS CHOOSE ONEPOINT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-orange-600 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Denipitiya & Mirissa Operations
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 sm:mt-3 tracking-tight">
            Why you will love riding with us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
            Based right here in Denipitiya and Mirissa, we give you prompt local service and instant WhatsApp support:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-xl text-slate-900">Mirissa Beach & Surf Freedom</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tuk-tuks add up fast. With a scooter from our Mirissa or Denipitiya hub, you can hop between Coconut Tree Hill, Secret Beach, and Weligama surf points anytime.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-xl text-slate-900">100% Honest Handover</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Before handover, we take 4 photos of the bike right alongside you and send them to your WhatsApp. When you return, your deposit is refunded immediately with zero drama.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-xl text-slate-900">Doorstep Hotel & Villa Delivery</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Staying at a hotel, guesthouse, or villa in Denipitiya, Mirissa, or Weligama? Just message us on WhatsApp and our team will deliver the bike directly to your doorstep.
            </p>
          </div>

        </div>
      </section>

      {/* 4. RIDER STORIES WITH BRIGHT VISIBLE BACKGROUND & CRISP WHITE CARDS (NOT DARK) */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        
        {/* CLEARLY VISIBLE TROPICAL OCEAN SUNSET BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90"
            alt="Tropical Sri Lanka Coastline"
            className="w-full h-full object-cover object-center"
          />
          {/* Light translucent dark overlay so the tropical beach sunset is clearly visible */}
          <div className="absolute inset-0 bg-slate-950/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-orange-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest bg-slate-900/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
              <Quote className="w-3.5 h-3.5 text-orange-400" />
              <span>Verified Rider Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Hear from people who rode with us in Mirissa & Denipitiya
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Real experiences from local riders and international travelers:
            </p>
          </div>

          {/* CRISP BRIGHT WHITE CARDS (NOT DARK!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xl space-y-4 hover:shadow-2xl hover:scale-[1.01] transition-all text-slate-800">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "We rented two Dio scooters in Mirissa for 10 days. The WhatsApp communication was insanely fast. They dropped the bikes at our villa, took photos of existing marks together, and gave our deposit back in cash 5 minutes after checking the bikes. Best rental in Sri Lanka!"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-orange-500/20">
                  SM
                </div>
                <div>
                  <p className="font-extrabold text-sm text-slate-900">Sophie & Marc</p>
                  <p className="text-xs text-slate-500">Munich, Germany (Mirissa)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xl space-y-4 hover:shadow-2xl hover:scale-[1.01] transition-all text-slate-800">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "Picked up a Pulsar from Denipitiya branch for a week. The bike was well-maintained, helmet was clean, and the free mobile mount was super helpful for exploring the south coast. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-blue-500/20">
                  KF
                </div>
                <div>
                  <p className="font-extrabold text-sm text-slate-900">Kasun Fernando</p>
                  <p className="text-xs text-slate-500">Denipitiya & Mirissa Rider</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-2xl space-y-4 hover:shadow-2xl hover:scale-[1.01] transition-all text-slate-800">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "Rented a Royal Enfield Classic 350 in Mirissa. That engine thump cruising down the Galle road was unforgettable. OnePoint team checked in on WhatsApp to make sure everything was running smooth. 5 stars!"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-emerald-500/20">
                  DW
                </div>
                <div>
                  <p className="font-extrabold text-sm text-slate-900">David Walker</p>
                  <p className="text-xs text-slate-500">Melbourne, Australia</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FAQ & RULES SECTION */}
      <section id="faq" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-orange-600 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Everything You Need to Know
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            FAQ & Riding Rules
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Answers to the most common questions about renting with us in Denipitiya & Mirissa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">

          {/* FAQ Column 1 */}
          <div className="space-y-4">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    What documents do I need to rent?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    You need a valid <strong>Sri Lanka Driving License</strong> (for locals) or an <strong>International Driving Permit (IDP)</strong> endorsed by the Automobile Association of Ceylon (AAC) for foreigners. A copy of your <strong>NIC or Passport</strong> is also required. We'll verify and photograph them at handover.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    Where can I pick up and return the bike?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We operate from two hubs: <strong>Denipitiya (Main Office & Workshop)</strong> and <strong>Mirissa (Beach Road Hub)</strong>. We also offer <strong>doorstep delivery</strong> to hotels, villas, and guesthouses in the Denipitiya–Mirissa–Weligama belt. Just WhatsApp us your location and we'll arrange it.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    How does the security deposit work?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A refundable security deposit is collected at pickup (amount varies by bike). Before handover, we <strong>photograph all 4 sides of the bike together with you</strong> and send those photos to your WhatsApp. When you return the bike in the same condition, your deposit is refunded within <strong>10 minutes — in cash, on the spot.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    Can tourists & foreigners rent from you?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Yes! We welcome international riders. You'll need an <strong>IDP endorsed by the Automobile Association of Ceylon (AAC)</strong> — obtainable at the AAC office in Colombo or online before your trip. Your home country license alone is <em>not</em> valid in Sri Lanka by law.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* FAQ Column 2 */}
          <div className="space-y-4">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    Are helmets included in the rental?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>One certified helmet is included free</strong> with every rental. Need a second helmet for a pillion rider? Add it for just <strong>LKR 250/day.</strong> All helmets are sanitized with clean visors before handover.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    What is the minimum rental period?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our minimum rental is <strong>1 full day.</strong> Daily rates apply regardless of the hours ridden within that day. For longer rentals (7+ days), we offer discounted weekly rates — just ask us on WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    What happens if the bike breaks down on the road?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We provide <strong>24/7 WhatsApp roadside support.</strong> If you face a mechanical issue, message or call us immediately. We'll either guide you through a quick fix or arrange a replacement bike. You are <em>never</em> left stranded — especially in the Mirissa and Denipitiya areas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                    Can you deliver to my hotel in Mirissa or Weligama?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Absolutely. <strong>Doorstep delivery is available</strong> for hotels, guesthouses, and villas in the Mirissa, Weligama, and Denipitiya areas. Send us a WhatsApp with your location pin and we'll bring the bike directly to you.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sri Lanka Riding Rules Box */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇱🇰</span>
                <h3 className="font-black text-white text-lg sm:text-xl">Sri Lanka Road Rules for Riders</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Keep these in mind to stay safe and legal on our roads:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-white">Keep Left:</strong> Sri Lanka drives on the left. Overtake on the right. Always.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-white">Helmet is Mandatory:</strong> Police checkpoints are frequent. Riding without a helmet is an on-the-spot fine.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-white">No Expressways (E01 / E02):</strong> Motorcycles and scooters are strictly banned on the Southern Expressway and all expressways in Sri Lanka.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-white">License Must Be Carried:</strong> Always carry your physical driving license or IDP while riding. Digital copies are not accepted at checkpoints.</span>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0 sm:w-56 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-400 fill-current" />
              </div>
              <p className="text-white font-extrabold text-sm">Still have a question?</p>
              <p className="text-slate-400 text-xs leading-relaxed">We reply on WhatsApp within minutes — day or night.</p>
              <a
                href={generateQuickChatLink('Hi OnePoint Renter! I have a question about renting a bike in Denipitiya / Mirissa.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-3xl font-black">
              Need a bike in Denipitiya or Mirissa today?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Message us directly on WhatsApp. We confirm bike availability, send live location pins, or arrange doorstep delivery to your hotel in minutes.
            </p>
          </div>
          <a
            href={generateQuickChatLink('Hi OnePoint Renter! I need to rent a bike in Denipitiya / Mirissa today. What bikes are available?')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center justify-center bg-white text-emerald-800 hover:bg-emerald-50 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-emerald-600" />
            <span>Chat with us on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* BOOKING MODAL */}
      <BookingModal
        bike={activeBookingBike}
        onClose={() => setActiveBookingBike(null)}
      />

    </div>
  );
}
