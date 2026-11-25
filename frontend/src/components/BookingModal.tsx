'use client';

import React, { useState, useMemo } from 'react';
import { Bike } from '../types';
import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  FileText,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { createBooking } from '../lib/api';

interface BookingModalProps {
  bike: Bike | null;
  onClose: () => void;
}

export default function BookingModal({ bike, onClose }: BookingModalProps) {
  if (!bike) return null;

  // Defaults: tomorrow to 3 days later
  const today = new Date();
  const defaultStart = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split('T')[0];
  const defaultEnd = new Date(today.setDate(today.getDate() + 3))
    .toISOString()
    .split('T')[0];

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  
  // Set default location to Mirissa or Denipitiya based on the bike's actual location
  const [pickupLocation, setPickupLocation] = useState(
    bike.location === 'Denipitiya' ? 'Denipitiya' : 'Mirissa'
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    bike.location === 'Denipitiya' ? 'Denipitiya' : 'Mirissa'
  );
  const [helmetsCount, setHelmetsCount] = useState(1);

  // Customer Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNicOrPassport, setCustomerNicOrPassport] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    bookingReference: string;
    whatsappLink: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate pricing
  const calculation = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalDays = Math.max(diffDays, 1);

    let dailyRate = bike.dailyRateLkr;
    let isWeeklyDiscount = false;
    if (totalDays >= 7 && bike.weeklyRateLkr) {
      dailyRate = bike.weeklyRateLkr / 7;
      isWeeklyDiscount = true;
    }

    const baseRental = Math.round(dailyRate * totalDays);
    const extraHelmets = Math.max(0, helmetsCount - 1);
    const helmetFee = extraHelmets * 250 * totalDays;
    const totalAmount = baseRental + helmetFee;

    return {
      totalDays,
      dailyRate: Math.round(dailyRate),
      isWeeklyDiscount,
      baseRental,
      helmetFee,
      totalAmount,
      deposit: bike.depositLkr,
    };
  }, [startDate, endDate, helmetsCount, bike]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName || !customerPhone || !customerNicOrPassport || !drivingLicenseNumber) {
      setErrorMsg('Please complete all required fields (Name, WhatsApp number, NIC/Passport, Driving license).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        bikeId: bike.id,
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        customerNicOrPassport,
        drivingLicenseNumber,
        pickupLocation,
        dropoffLocation,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        helmetsCount,
        notes,
        totalAmountLkr: calculation.totalAmount,
        depositLkr: calculation.deposit,
        totalDays: calculation.totalDays,
        bikeName: `${bike.brand} ${bike.name}`,
      };

      const result = await createBooking(payload);
      setConfirmedData({
        bookingReference: result.booking.bookingReference,
        whatsappLink: result.whatsappLink,
      });

      if (result.whatsappLink) {
        window.open(result.whatsappLink, '_blank');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Booking submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={bike.imageUrl}
              alt={bike.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {bike.category}
                </span>
                <span className="text-xs text-orange-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  Hub: {bike.location}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{bike.name}</h2>
              <p className="text-xs text-slate-300 font-medium">
                Standard Rate: <strong className="text-orange-400 font-bold">LKR {bike.dailyRateLkr.toLocaleString()}</strong> / day
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {confirmedData ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Booking Request Generated!
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Your reservation reference is:
              </p>
              <div className="inline-block bg-orange-50 border border-orange-200 text-orange-700 font-mono font-bold text-lg px-4 py-1.5 rounded-xl mt-2">
                {confirmedData.bookingReference}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-sm space-y-2 text-slate-700 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Rental Period:</span>
                <span className="font-semibold">{calculation.totalDays} Days ({startDate} to {endDate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Location:</span>
                <span className="font-semibold text-slate-900">{pickupLocation} Hub</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payable Rental:</span>
                <span className="font-semibold text-slate-900">LKR {calculation.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-xs text-slate-500">
                <span>Refundable Deposit (Pay at Pickup):</span>
                <span>LKR {calculation.deposit.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={confirmedData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full text-slate-500 hover:text-slate-800 text-sm font-medium py-2"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-2xl text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Date and Location Selection (DENIPITIYA & MIRISSA ONLY) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Rental Dates & Hub Location
                </h4>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  📍 Denipitiya & Mirissa Hubs Only
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* LOCATION PICKER LIMITED STRICTLY TO DENIPITIYA & MIRISSA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Denipitiya">Denipitiya (Main Office Hub)</option>
                    <option value="Mirissa">Mirissa (Beach Hub)</option>
                    <option value="Doorstep Delivery (Denipitiya / Mirissa Area)">
                      Doorstep Delivery (Denipitiya / Mirissa Hotel or Villa)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Return Location
                  </label>
                  <select
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Denipitiya">Denipitiya (Main Office Hub)</option>
                    <option value="Mirissa">Mirissa (Beach Hub)</option>
                    <option value="Doorstep Pickup (Denipitiya / Mirissa Area)">
                      Doorstep Pickup (Denipitiya / Mirissa Hotel or Villa)
                    </option>
                  </select>
                </div>
              </div>

              {/* Helmets count */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Helmets Needed
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHelmetsCount(1)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      helmetsCount === 1
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>1 Helmet (Free Included)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelmetsCount(2)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      helmetsCount === 2
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>2 Helmets (+LKR 250/day)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Rider Information & License
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kasun Fernando / John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="+94 77 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIC or Passport No <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="951234567V or Passport No"
                    value={customerNicOrPassport}
                    onChange={(e) => setCustomerNicOrPassport(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Driving License No <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sri Lanka License or IDP No"
                    value={drivingLicenseNumber}
                    onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Price Estimation Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Duration:</span>
                <span className="font-semibold text-slate-900">{calculation.totalDays} Days</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Base Daily Rate:</span>
                <span className="font-semibold">
                  LKR {calculation.dailyRate.toLocaleString()} / day
                  {calculation.isWeeklyDiscount && (
                    <span className="text-emerald-600 ml-1.5 font-bold">(Weekly Discount Applied)</span>
                  )}
                </span>
              </div>
              {calculation.helmetFee > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Additional Helmet Fee:</span>
                  <span className="font-semibold">LKR {calculation.helmetFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Rental Amount:</span>
                <span className="text-orange-600 font-extrabold text-base">
                  LKR {calculation.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px] pt-1">
                <span>Refundable Security Deposit (Paid on pickup):</span>
                <span>LKR {calculation.deposit.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{loading ? 'Processing...' : 'Reserve & Open in WhatsApp'}</span>
              </button>
              <p className="text-center text-[11px] text-slate-400">
                * You will be directly connected to OnePoint Renter on WhatsApp to confirm pickup in Denipitiya / Mirissa.
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
