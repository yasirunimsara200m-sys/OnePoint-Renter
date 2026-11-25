'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { generateQuickChatLink, getOfficialWhatsAppNumber, formatPhoneNumber } from '../lib/api';

export default function Footer() {
  const pathname = usePathname();
  const [phoneDisplay, setPhoneDisplay] = useState('+94 77 000 0000');

  useEffect(() => {
    const updatePhone = () => {
      setPhoneDisplay(formatPhoneNumber());
    };
    updatePhone();
    window.addEventListener('opv_whatsapp_updated', updatePhone);
    return () => window.removeEventListener('opv_whatsapp_updated', updatePhone);
  }, []);

  // Hide public footer on admin routes for clean dedicated dashboard UX
  if (pathname?.startsWith('/opv-admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Bike className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                OnePoint<span className="text-orange-500">.</span> Renter
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Denipitiya & Mirissa’s premier scooter and motorcycle rental service. Transparent pricing, instant WhatsApp confirmations, and doorstep hotel delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={generateQuickChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Us Directly
              </a>
            </div>
          </div>

          {/* Rental Hubs: Denipitiya & Mirissa Exclusively */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              Denipitiya & Mirissa Hubs
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><span className="text-orange-400 font-bold">• Denipitiya:</span> Main Office, Workshop & Fleet Hub</li>
              <li><span className="text-orange-400 font-bold">• Mirissa:</span> Beach Road Hub & Tourist Counter</li>
              <li><span className="text-orange-400 font-bold">• Delivery:</span> Mirissa, Denipitiya & Weligama Hotels</li>
            </ul>
          </div>

          {/* Quick Links & Information */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Rental Fleet</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#fleet" className="hover:text-white transition-colors">Automatic Scooters (Dio, RayZR, Ntorq)</Link></li>
              <li><Link href="#fleet" className="hover:text-white transition-colors">Manual Gear Bikes (Pulsar, FZ-S, Hornet)</Link></li>
              <li><Link href="#fleet" className="hover:text-white transition-colors">Adventure Touring (Royal Enfield 350)</Link></li>
              <li><Link href="#guide" className="hover:text-white transition-colors">Sri Lanka Driving License Guidelines</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">Security Deposit Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact & Support</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{phoneDisplay} (Hotline & WhatsApp)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>rentals@onepoint.lk</span>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Denipitiya & Mirissa, Southern Province, Sri Lanka</span>
              </p>
              <div className="pt-2 p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                <p className="text-amber-300 font-semibold mb-1">🇱🇰 Local Regulation Note:</p>
                <p className="text-slate-300">
                  Valid Sri Lankan Driving License or Endorsed International Driving Permit (IDP) required by law.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OnePoint Renter. Denipitiya & Mirissa Bike Rentals. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Terms of Rental</span>
            <span>Security Deposit Policy</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
