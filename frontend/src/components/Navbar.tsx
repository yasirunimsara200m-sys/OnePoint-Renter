'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, MessageCircle, Phone, Menu, X } from 'lucide-react';
import { generateQuickChatLink, getOfficialWhatsAppNumber, formatPhoneNumber } from '../lib/api';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState('+94 77 000 0000');
  const [rawPhone, setRawPhone] = useState('94770000000');
  const pathname = usePathname();

  useEffect(() => {
    const updatePhone = () => {
      const p = getOfficialWhatsAppNumber();
      setRawPhone(p);
      setPhoneDisplay(formatPhoneNumber(p));
    };
    updatePhone();
    window.addEventListener('opv_whatsapp_updated', updatePhone);
    return () => window.removeEventListener('opv_whatsapp_updated', updatePhone);
  }, []);

  // Hide public navbar on admin routes for security and clean dashboard UX
  if (pathname?.startsWith('/opv-admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Bike className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  OnePoint<span className="text-orange-500">.</span>
                </span>
                <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
                  Renter
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Sri Lanka Bike Rentals</p>
            </div>
          </Link>

          {/* Desktop Links (Clean public links only - Admin panel is NOT linked here) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#fleet" className="hover:text-orange-600 transition-colors">
              Fleet & Scooters
            </Link>
            <Link href="#locations" className="hover:text-orange-600 transition-colors">
              Locations
            </Link>
            <Link href="#guide" className="hover:text-orange-600 transition-colors">
              Tourist Guide
            </Link>
            <Link href="#faq" className="hover:text-orange-600 transition-colors">
              FAQ & Rules
            </Link>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:+${rawPhone}`}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium text-sm px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>{phoneDisplay}</span>
            </a>

            <a
              href={generateQuickChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={generateQuickChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 bg-emerald-50 rounded-xl"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 rounded-lg"
          >
            🛵 Bike & Scooter Fleet
          </Link>
          <Link
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 rounded-lg"
          >
            📍 Our Hubs (Denipitiya & Mirissa)
          </Link>
          <Link
            href="#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-orange-50 rounded-lg"
          >
            📖 Riding & Tourist Guide
          </Link>
          <div className="pt-2">
            <a
              href={generateQuickChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat & Book on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
