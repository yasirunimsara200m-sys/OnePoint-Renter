'use client';

import React from 'react';
import { Bike } from '../types';
import {
  MapPin,
  Gauge,
  Cog,
  MessageCircle,
  CalendarCheck,
  Check,
} from 'lucide-react';
import { generateDirectWhatsAppLink } from '../lib/api';

interface BikeCardProps {
  bike: Bike;
  onBookNow: (bike: Bike) => void;
}

export default function BikeCard({ bike, onBookNow }: BikeCardProps) {
  const isScooter = bike.category === 'SCOOTER';
  const isAdventure = bike.category === 'ADVENTURE';

  // Quick 1-click WhatsApp link generator
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 3);

  const quickWhatsAppUrl = generateDirectWhatsAppLink({
    bikeName: `${bike.brand} ${bike.name}`,
    customerName: 'Customer',
    customerPhone: 'N/A',
    customerNicOrPassport: 'To be provided',
    pickupLocation: bike.location,
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: defaultEndDate.toISOString().split('T')[0],
    totalDays: 2,
    totalAmountLkr: bike.dailyRateLkr * 2,
    depositLkr: bike.depositLkr,
    helmetsCount: 1,
  });

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Image & Badges Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={bike.imageUrl}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Location Badge (Compact on mobile) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
          <span className="truncate">{bike.location}</span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <span
            className={`text-[9px] sm:text-xs font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm text-white ${
              isScooter
                ? 'bg-orange-500'
                : isAdventure
                ? 'bg-purple-600'
                : 'bg-blue-600'
            }`}
          >
            {isScooter ? 'Auto' : isAdventure ? 'Cruiser' : 'Manual'}
          </span>
        </div>

        {/* Availability Status */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          {bike.status === 'AVAILABLE' ? (
            <span className="bg-emerald-500/90 text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Available
            </span>
          ) : (
            <span className="bg-slate-800/90 text-slate-200 text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-md backdrop-blur-sm">
              {bike.status === 'RENTED' ? 'Rented' : 'Maintenance'}
            </span>
          )}
        </div>
      </div>

      {/* Bike Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="font-extrabold text-xs sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {bike.name}
            </h3>
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono shrink-0">{bike.modelYear}</span>
          </div>

          <p className="text-[11px] text-slate-500 line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1 hidden sm:block">
            {bike.description || `${bike.brand} ${bike.name} available in ${bike.location}.`}
          </p>

          {/* Compact Specs Row */}
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-3.5 py-1.5 sm:py-2 border-y border-slate-100 text-[10px] sm:text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
              <span>{bike.engineCapacity}cc</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Cog className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
              <span>{bike.transmission === 'AUTOMATIC' ? 'Automatic' : 'Manual'}</span>
            </div>
          </div>

          {/* Highlights (visible on larger mobile/desktop) */}
          <div className="hidden sm:flex flex-wrap gap-1 mt-2">
            {bike.features.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-0.5 bg-slate-50 text-slate-600 border border-slate-200 text-[10px] px-1.5 py-0.5 rounded"
              >
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                <span className="truncate max-w-[100px]">{feat}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2 sm:mb-3">
            <div>
              <span className="text-[9px] sm:text-xs text-slate-400 font-semibold block leading-tight">Rate</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-black text-sm sm:text-xl text-slate-900">
                  LKR {bike.dailyRateLkr.toLocaleString()}
                </span>
                <span className="text-[9px] sm:text-xs text-slate-400">/day</span>
              </div>
            </div>

            {bike.weeklyRateLkr && (
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded">
                  7+ Days Discount
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons: 2 buttons side-by-side, responsive on mobile */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => onBookNow(bike)}
              className="w-full flex items-center justify-center gap-1 bg-slate-900 hover:bg-orange-600 text-white py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[10px] sm:text-xs transition-colors shadow-sm"
            >
              <CalendarCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Book</span>
            </button>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[10px] sm:text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
