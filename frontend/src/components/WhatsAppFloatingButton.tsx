'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';
import { generateQuickChatLink } from '../lib/api';

export default function WhatsAppFloatingButton() {
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const pathname = usePathname();

  // Hide floating WhatsApp button on admin routes
  if (pathname?.startsWith('/opv-admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Friendly Popup tooltip */}
      {tooltipOpen && (
        <div className="mb-3 max-w-xs bg-white text-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-200 relative animate-bounce text-xs">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute -top-1 -right-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-slate-900 mb-0.5">Need a Bike or Scooter in Sri Lanka? 🛵</p>
          <p className="text-slate-500 text-[11px]">
            Message us on WhatsApp for fast booking, discounts, and instant pickup!
          </p>
        </div>
      )}

      {/* Floating CTA Button */}
      <a
        href={generateQuickChatLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Glowing Radar Pulse */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
}
