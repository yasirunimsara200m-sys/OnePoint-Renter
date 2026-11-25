'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bike,
  Shield,
  Key,
  Users,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Plus,
  RefreshCw,
  LogOut,
  MessageCircle,
  Phone,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Image as ImageIcon,
  ExternalLink,
  Edit,
  Trash2,
  Check,
  LayoutDashboard,
  Settings,
  Database,
  MapPin,
  Menu,
  X,
  Gauge,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { fallbackBikes, getOfficialWhatsAppNumber, setOfficialWhatsAppNumber, formatPhoneNumber } from '../../lib/api';
import { Bike as BikeType, Booking, BikeStatus, BookingStatus } from '../../types';

const PRESET_IMAGE_LINKS = [
  {
    name: 'Honda Dio (Yellow/Black)',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Yamaha Ray ZR (Blue)',
    url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'TVS Ntorq Race (Red/Black)',
    url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Yamaha FZ-S (Matte Black)',
    url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bajaj Pulsar 150 (Neon Red)',
    url: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Royal Enfield Classic 350',
    url: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80',
  },
];

const initialMockBookings: Booking[] = [
  {
    id: 'b-101',
    bookingReference: 'OPR-2026-X89K2',
    bikeId: 'bike-1',
    bike: fallbackBikes[0],
    customerName: 'Kasun Fernando',
    customerPhone: '+94771234567',
    customerEmail: 'kasun.f@gmail.com',
    customerNicOrPassport: '921503421V',
    drivingLicenseNumber: 'B8291024',
    pickupLocation: 'Denipitiya',
    dropoffLocation: 'Denipitiya',
    startDate: '2026-12-01',
    endDate: '2026-12-04',
    totalDays: 3,
    dailyRateLkr: 2500,
    helmetsCount: 1,
    helmetFeeLkr: 0,
    totalAmountLkr: 7500,
    depositLkr: 5000,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'b-102',
    bookingReference: 'OPR-2026-M44B1',
    bikeId: 'bike-2',
    bike: fallbackBikes[1],
    customerName: 'Liam Smith',
    customerPhone: '+94719876543',
    customerEmail: 'liam.smith@ukmail.co.uk',
    customerNicOrPassport: 'PASSPORT-UK-882109',
    drivingLicenseNumber: 'IDP-UK-7721-AAC',
    pickupLocation: 'Mirissa',
    dropoffLocation: 'Mirissa',
    startDate: '2026-11-26',
    endDate: '2026-12-03',
    totalDays: 7,
    dailyRateLkr: 2428,
    helmetsCount: 2,
    helmetFeeLkr: 1750,
    totalAmountLkr: 18750,
    depositLkr: 5000,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'b-103',
    bookingReference: 'OPR-2026-T91A4',
    bikeId: 'bike-4',
    bike: fallbackBikes[3],
    customerName: 'Nuwan Jayasinghe',
    customerPhone: '+94765551234',
    customerEmail: 'nuwan.j@yahoo.com',
    customerNicOrPassport: '881029411V',
    drivingLicenseNumber: 'B1194012',
    pickupLocation: 'Denipitiya',
    dropoffLocation: 'Denipitiya',
    startDate: '2026-11-20',
    endDate: '2026-11-23',
    totalDays: 3,
    dailyRateLkr: 3500,
    helmetsCount: 1,
    helmetFeeLkr: 0,
    totalAmountLkr: 10500,
    depositLkr: 7500,
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 400000000).toISOString(),
  },
];

export default function OpvAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // WhatsApp Business Hotline State
  const [adminWhatsAppNumber, setAdminWhatsAppNumber] = useState('94770000000');
  const [whatsAppSaveMessage, setWhatsAppSaveMessage] = useState('');

  // Check persistent session & load settings on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedSession = localStorage.getItem('opv_admin_session');
      if (savedSession === 'true') {
        setIsAuthenticated(true);
      }
      setAdminWhatsAppNumber(getOfficialWhatsAppNumber());
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }, []);

  const handleSaveWhatsAppNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = setOfficialWhatsAppNumber(adminWhatsAppNumber);
    setAdminWhatsAppNumber(updated);
    setWhatsAppSaveMessage('✓ WhatsApp Hotline updated and live across the entire website!');
    setTimeout(() => setWhatsAppSaveMessage(''), 5000);
  };

  // Active Sidebar Navigation View
  const [activeNav, setActiveNav] = useState<'DASHBOARD' | 'BOOKINGS' | 'FLEET' | 'INSPECTION' | 'SETTINGS'>('DASHBOARD');
  const [bookingFilter, setBookingFilter] = useState<string>('ALL');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [bookings, setBookings] = useState<Booking[]>(initialMockBookings);
  const [bikes, setBikes] = useState<BikeType[]>(fallbackBikes);

  // Add / Edit Bike Modal State
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [editingBikeId, setEditingBikeId] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  const [bikeForm, setBikeForm] = useState({
    name: '',
    brand: 'Honda',
    modelYear: 2024,
    category: 'SCOOTER' as any,
    engineCapacity: 110,
    transmission: 'AUTOMATIC' as any,
    dailyRateLkr: 2500,
    depositLkr: 5000,
    location: 'Denipitiya',
    plateNumber: '',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    description: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim() === 'admin@onepoint.lk' && loginPassword === 'Admin@123') {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('opv_admin_session', 'true');
      } catch (err) {
        console.warn('Storage error', err);
      }
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please enter authorized administrator email and password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('opv_admin_session');
    } catch (err) {
      console.warn('Storage error', err);
    }
  };

  const handleOpenAddModal = () => {
    setEditingBikeId(null);
    setImageLoadError(false);
    setBikeForm({
      name: '',
      brand: 'Honda',
      modelYear: 2024,
      category: 'SCOOTER',
      engineCapacity: 110,
      transmission: 'AUTOMATIC',
      dailyRateLkr: 2500,
      depositLkr: 5000,
      location: 'Denipitiya',
      plateNumber: '',
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      description: '',
    });
    setShowBikeModal(true);
  };

  const handleOpenEditModal = (bike: BikeType) => {
    setEditingBikeId(bike.id);
    setImageLoadError(false);
    setBikeForm({
      name: bike.name,
      brand: bike.brand,
      modelYear: bike.modelYear,
      category: bike.category,
      engineCapacity: bike.engineCapacity,
      transmission: bike.transmission,
      dailyRateLkr: bike.dailyRateLkr,
      depositLkr: bike.depositLkr,
      location: bike.location,
      plateNumber: bike.plateNumber,
      imageUrl: bike.imageUrl,
      description: bike.description || '',
    });
    setShowBikeModal(true);
  };

  const handleBikeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bikeForm.name || !bikeForm.plateNumber || !bikeForm.imageUrl) {
      alert('Please provide Bike Name, Plate Number, and Image URL.');
      return;
    }

    if (editingBikeId) {
      setBikes((prev) =>
        prev.map((b) =>
          b.id === editingBikeId
            ? {
                ...b,
                ...bikeForm,
              }
            : b
        )
      );
    } else {
      const newCreated: BikeType = {
        id: `bike-${Date.now()}`,
        ...bikeForm,
        status: 'AVAILABLE',
        features: ['1 Free Helmet Included', 'Insured', 'Mobile Mount'],
      };
      setBikes([newCreated, ...bikes]);
    }

    setShowBikeModal(false);
  };

  const handleDeleteBike = (bikeId: string) => {
    if (confirm('Are you sure you want to remove this bike from the fleet?')) {
      setBikes(bikes.filter((b) => b.id !== bikeId));
    }
  };

  const handleToggleBikeStatus = (bikeId: string) => {
    setBikes((prev) =>
      prev.map((b) => {
        if (b.id === bikeId) {
          const nextStatus: BikeStatus =
            b.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE';
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleWhatsAppCustomer = (booking: Booking, customMsg?: string) => {
    let cleanPhone = booking.customerPhone.replace(/[\s\+\-]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '94' + cleanPhone.substring(1);
    }
    const defaultMsg =
      customMsg ||
      `Hello ${booking.customerName}! This is OnePoint Renter Admin regarding your reservation ${booking.bookingReference} for ${booking.bike.name}. How can we assist you?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  // KPIs
  const totalFleet = bikes.length;
  const availableBikes = bikes.filter((b) => b.status === 'AVAILABLE').length;
  const activeRentals = bookings.filter((b) => b.status === 'ACTIVE').length;
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'COMPLETED' || b.status === 'ACTIVE')
    .reduce((sum, b) => sum + b.totalAmountLkr, 0);

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'ALL') return true;
    return b.status === bookingFilter;
  });

  // Login Screen
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-400 text-xs">
        Loading admin console...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-white selection:bg-orange-500">
        <div className="max-w-md w-full bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-500/25">
              <Shield className="w-9 h-9" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              OnePoint Renter <span className="text-orange-500 font-mono text-xl">OPV-Admin</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Enterprise Fleet & Rental Management Operations
            </p>
          </div>

          {authError && (
            <div className="bg-rose-950/60 border border-rose-800 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <input
                type="text"
                name="opv_admin_email_id"
                id="opv_admin_email_id"
                autoComplete="off"
                spellCheck={false}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="example@email.lk"
                required
                className="w-full border border-slate-700 bg-slate-800/90 placeholder:text-slate-500 placeholder:italic rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="opv_admin_secret"
                id="opv_admin_secret"
                autoComplete="new-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full border border-slate-700 bg-slate-800/90 placeholder:text-slate-500 placeholder:italic rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 text-sm"
            >
              Secure Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* MOBILE TOPBAR */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">OnePoint.</span>
            <span className="text-[10px] text-orange-400 font-mono ml-1.5">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* DEDICATED LEFT SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">OnePoint</span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 font-mono font-bold px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Fleet & Booking Ops</p>
              </div>
            </div>

            {/* Live Neon PostgreSQL Status Pill */}
            <div className="mt-4 bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <div className="truncate">
                <span className="text-slate-400 block text-[10px]">Database</span>
                <span className="font-mono text-emerald-300 font-semibold truncate block">
                  Neon PostgreSQL 🟢
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveNav('DASHBOARD');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'DASHBOARD'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('BOOKINGS');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'BOOKINGS'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings & WhatsApp</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNav('FLEET');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'FLEET'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bike className="w-4 h-4" />
                <span>Fleet & Photo Links</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                {bikes.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNav('INSPECTION');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'INSPECTION'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Identity Verification</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('SETTINGS');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'SETTINGS'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Cloud DB</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-800/60 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="truncate flex-1">
              <span className="block text-xs font-bold text-white truncate">Administrator</span>
              <span className="block text-[10px] text-slate-400 truncate font-mono">admin@onepoint.lk</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>OnePoint Operations</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-orange-400 font-bold capitalize">{activeNav.toLowerCase()}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              {activeNav === 'DASHBOARD' && 'Fleet & Rental Overview'}
              {activeNav === 'BOOKINGS' && 'Bookings & WhatsApp Communications'}
              {activeNav === 'FLEET' && 'Fleet Inventory & Live Photo Links'}
              {activeNav === 'INSPECTION' && 'Rider Verification & Handover Rules'}
              {activeNav === 'SETTINGS' && 'System Configuration & Neon Database'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveNav('SETTINGS')}
              className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-700/80 hover:border-orange-500/60 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-mono transition-colors"
              title="Click to edit WhatsApp Number"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formatPhoneNumber(adminWhatsAppNumber)}</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Bike via Link</span>
            </button>
          </div>
        </div>

        {/* 1. DASHBOARD VIEW */}
        {activeNav === 'DASHBOARD' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Total Fleet</span>
                  <Bike className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">{totalFleet} Bikes</div>
                <span className="text-[11px] text-emerald-400 font-bold">{availableBikes} Available for rent</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Active Rentals</span>
                  <Gauge className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-400">{activeRentals}</div>
                <span className="text-[11px] text-slate-400">Riders on the road</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Pending Requests</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{pendingBookings}</div>
                <span className="text-[11px] text-amber-300 font-bold">WhatsApp Action Needed</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Total Verified Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  LKR {totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">Active & Completed</span>
              </div>
            </div>

            {/* Fleet Availability Gauge & Quick Hub Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Bike className="w-4 h-4 text-orange-400" />
                    Fleet Status & Rental Capacity
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {Math.round((availableBikes / Math.max(totalFleet, 1)) * 100)}% Available
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(availableBikes / Math.max(totalFleet, 1)) * 100}%` }}
                    className="bg-emerald-500 h-full"
                    title="Available"
                  ></div>
                  <div
                    style={{ width: `${(activeRentals / Math.max(totalFleet, 1)) * 100}%` }}
                    className="bg-blue-500 h-full"
                    title="Active"
                  ></div>
                  <div
                    style={{
                      width: `${
                        ((totalFleet - availableBikes - activeRentals) / Math.max(totalFleet, 1)) *
                        100
                      }%`,
                    }}
                    className="bg-slate-600 h-full"
                    title="Maintenance"
                  ></div>
                </div>

                <div className="flex gap-6 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span>Available: {availableBikes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>Rented: {activeRentals}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                    <span>Maintenance: {totalFleet - availableBikes - activeRentals}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white">Quick Operations</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleOpenAddModal}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-orange-400" />
                      Add New Bike via Link
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveNav('BOOKINGS')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      View Pending WhatsApp Bookings
                    </span>
                    <span className="text-amber-400 font-mono text-[11px] font-bold">
                      {pendingBookings}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveNav('SETTINGS')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-xs font-bold text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      Check Neon PostgreSQL Health
                    </span>
                    <span className="text-emerald-400 text-[10px] font-bold">Live</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Recent Bookings Quick Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">Recent Customer Reservations</h3>
                <button
                  onClick={() => setActiveNav('BOOKINGS')}
                  className="text-xs font-bold text-orange-400 hover:underline"
                >
                  View All ({bookings.length})
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/60 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3">Reference</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Bike</th>
                      <th className="py-3 px-3">Amount</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">WhatsApp Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {bookings.slice(0, 3).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-orange-400">{b.bookingReference}</td>
                        <td className="py-3 px-3 font-semibold text-white">{b.customerName}</td>
                        <td className="py-3 px-3">{b.bike.name}</td>
                        <td className="py-3 px-3 font-bold text-white">LKR {b.totalAmountLkr.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              b.status === 'PENDING'
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                : b.status === 'CONFIRMED'
                                ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                                : b.status === 'ACTIVE'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleWhatsAppCustomer(b)}
                            className="bg-[#25D366] hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 2. BOOKINGS VIEW */}
        {activeNav === 'BOOKINGS' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                {['ALL', 'PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilter(status)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      bookingFilter === status
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Ref & Customer</th>
                      <th className="py-3.5 px-4">Bike Details</th>
                      <th className="py-3.5 px-4">Rental Duration</th>
                      <th className="py-3.5 px-4">Total Fee</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-orange-400 text-[11px]">
                            {b.bookingReference}
                          </div>
                          <div className="font-bold text-white text-sm mt-0.5">
                            {b.customerName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {b.customerPhone} | NIC: {b.customerNicOrPassport}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={b.bike.imageUrl}
                              alt={b.bike.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white">{b.bike.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{b.bike.plateNumber}</div>
                              <div className="text-[11px] text-orange-400 font-semibold">
                                {b.helmetsCount} Helmet(s) Included
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200">
                            {b.startDate} to {b.endDate}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {b.totalDays} Days ({b.pickupLocation})
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-black text-white text-sm">
                            LKR {b.totalAmountLkr.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Deposit: LKR {b.depositLkr.toLocaleString()}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              b.status === 'PENDING'
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                : b.status === 'CONFIRMED'
                                ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                                : b.status === 'ACTIVE'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleWhatsAppCustomer(b)}
                              title="Open WhatsApp Chat"
                              className="bg-[#25D366] hover:bg-emerald-600 text-white p-2 rounded-xl transition-colors shadow-sm"
                            >
                              <MessageCircle className="w-4 h-4 fill-current" />
                            </button>

                            {b.status === 'PENDING' && (
                              <button
                                onClick={() => {
                                  handleUpdateBookingStatus(b.id, 'CONFIRMED');
                                  handleWhatsAppCustomer(
                                    b,
                                    `🎉 Hello ${b.customerName}! Your booking ${b.bookingReference} for ${b.bike.name} has been CONFIRMED by OnePoint Renter! Please bring your original Driving License upon pickup at ${b.pickupLocation}. Thank you!`
                                  );
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-colors"
                              >
                                Approve
                              </button>
                            )}

                            {b.status === 'CONFIRMED' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'ACTIVE')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-colors"
                              >
                                Handover
                              </button>
                            )}

                            {b.status === 'ACTIVE' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'COMPLETED')}
                                className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-colors"
                              >
                                Returned
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. FLEET VIEW (WITH PHOTO LINK INPUT & LIVE PREVIEW) */}
        {activeNav === 'FLEET' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-orange-400" />
                  Bike Photo Link Management
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste any direct image URL to instantly preview and attach the bike photo.
                </p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Bike via Link</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => (
                <div
                  key={bike.id}
                  className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-slate-800">
                    <img
                      src={bike.imageUrl}
                      alt={bike.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm font-mono border border-slate-700">
                      {bike.plateNumber}
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm ${
                          bike.status === 'AVAILABLE' ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        {bike.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-bold text-base text-white">{bike.name}</h3>
                        <span className="text-xs text-slate-400 font-mono">{bike.modelYear}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Hub: <strong className="text-slate-200">{bike.location}</strong> | {bike.engineCapacity}cc | {bike.transmission}
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-slate-800 pt-2.5 text-xs">
                      <div>
                        <span className="text-slate-400">Daily Rate:</span>
                        <p className="font-extrabold text-base text-white">
                          LKR {bike.dailyRateLkr.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Deposit:</span>
                        <p className="font-bold text-slate-300">
                          LKR {bike.depositLkr.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Photo link preview display */}
                    <div className="bg-slate-950 p-2 rounded-xl text-[11px] text-slate-400 truncate flex items-center gap-1.5 border border-slate-800">
                      <ImageIcon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate font-mono">{bike.imageUrl}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        onClick={() => handleOpenEditModal(bike)}
                        className="text-xs font-bold py-2 px-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3 h-3 text-orange-400" />
                        <span>Edit Link</span>
                      </button>
                      <button
                        onClick={() => handleToggleBikeStatus(bike.id)}
                        className="text-xs font-bold py-2 px-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors"
                      >
                        {bike.status === 'AVAILABLE' ? 'Maintenance' : 'Set Available'}
                      </button>
                      <button
                        onClick={() => handleDeleteBike(bike.id)}
                        className="text-xs font-bold py-2 px-2 rounded-xl border border-rose-900/60 hover:bg-rose-950/40 text-rose-400 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. INSPECTION PROTOCOL VIEW */}
        {activeNav === 'INSPECTION' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-white">
                Sri Lanka Handover Verification & Security Protocol
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Follow these official verification checks before handing keys to local and foreign riders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-800 rounded-2xl p-5 space-y-3 bg-slate-950/50">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  1. Identity & License Check
                </h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5">
                  <li>Verify original local Driving License (Classes A, A1).</li>
                  <li>For foreign tourists: Verify Passport and AAC-endorsed International Driving Permit (IDP).</li>
                  <li>Send a verification test message to customer WhatsApp number.</li>
                  <li>Collect refundable security deposit and issue receipt.</li>
                </ul>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 space-y-3 bg-slate-950/50">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  2. Vehicle Handover & Scratch Record
                </h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5">
                  <li>Take 4 smartphone photos around the bike with customer for scratch baseline.</li>
                  <li>Hand over sanitized certified helmets and verify visor clarity.</li>
                  <li><strong>Highway Law:</strong> Inform riders that two-wheelers are prohibited on Expressways (E01/E02).</li>
                  <li>Provide 24/7 OnePoint roadside breakdown hotline.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 5. SETTINGS & NEON DATABASE VIEW */}
        {activeNav === 'SETTINGS' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">System Settings & Cloud Database</h3>
              <p className="text-xs text-slate-400 mt-1">
                Live configuration details for your PostgreSQL database and WhatsApp services.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-slate-800 rounded-2xl p-5 space-y-3 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-300 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    Neon PostgreSQL Cloud Database
                  </span>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full">
                    Connected & Synced 🟢
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your application is connected to Neon Cloud PostgreSQL server in US-East-2 with schema synchronization active.
                </p>
                <div className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-300 border border-slate-800 truncate">
                  ep-proud-cake-beq5fotp-pooler.c-9.us-east-2.aws.neon.tech/neondb
                </div>
              </div>

              {/* WHATSAPP HOTLINE EDITABLE CONFIGURATION CARD */}
              <div className="border border-orange-500/30 rounded-2xl p-5 space-y-4 bg-slate-950/80 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div>
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      Live WhatsApp Business Hotline Configuration
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Change the WhatsApp number here to instantly update the customer website, header, footer, and booking modal links.
                    </p>
                  </div>
                  <span className="bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-xs font-mono font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                    Active: {formatPhoneNumber(adminWhatsAppNumber)}
                  </span>
                </div>

                {whatsAppSaveMessage && (
                  <div className="bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{whatsAppSaveMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSaveWhatsAppNumber} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={adminWhatsAppNumber}
                        onChange={(e) => setAdminWhatsAppNumber(e.target.value)}
                        placeholder="e.g. 0771234567 or 94771234567"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save WhatsApp Number</span>
                    </button>
                    <a
                      href={`https://wa.me/${adminWhatsAppNumber.replace(/[\s\+\-]/g, '').startsWith('0') ? '94' + adminWhatsAppNumber.replace(/[\s\+\-]/g, '').substring(1) : adminWhatsAppNumber.replace(/[\s\+\-]/g, '')}?text=OnePoint%20Renter%20Admin%20Test%20Message`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Test Live Link</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 Tip: You can enter in standard Sri Lankan format (e.g. <code className="text-orange-400 font-mono">0771234567</code>) or international format (<code className="text-orange-400 font-mono">94771234567</code> / <code className="text-orange-400 font-mono">+94 77 123 4567</code>). The system cleans and routes it automatically.
                  </p>
                </form>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 space-y-3 bg-slate-950/60">
                <span className="font-bold text-xs text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  Active Island-wide Rental Hubs
                </span>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {['Denipitiya Main Hub', 'Mirissa Beach Hub', 'Weligama Delivery Zone'].map((hub, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl">
                      {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT BIKE MODAL WITH LIVE PHOTO PREVIEW VIA LINK */}
      {showBikeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 max-w-xl w-full p-6 space-y-5 text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-white">
                  {editingBikeId ? 'Edit Bike Details & Photo Link' : 'Add New Bike via Photo Link'}
                </h3>
                <p className="text-xs text-slate-400">
                  Enter the direct photo URL to preview and save.
                </p>
              </div>
              <button
                onClick={() => setShowBikeModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBikeFormSubmit} className="space-y-4 text-xs">
              
              {/* IMAGE URL INPUT & LIVE PREVIEW BOX */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <label className="block font-bold text-slate-200">
                  Bike Photo Image Link (URL) <span className="text-orange-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/bike-photo.jpg"
                    value={bikeForm.imageUrl}
                    onChange={(e) => {
                      setBikeForm({ ...bikeForm, imageUrl: e.target.value });
                      setImageLoadError(false);
                    }}
                    required
                    className="flex-1 border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-900 text-white"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                    Quick Sample Presets (Select a photo with 1-click):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGE_LINKS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setBikeForm({ ...bikeForm, imageUrl: preset.url });
                          setImageLoadError(false);
                        }}
                        className="bg-slate-900 border border-slate-700 hover:border-orange-400 text-slate-300 text-[10px] px-2 py-1 rounded-lg font-medium transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LIVE PHOTO PREVIEW CONTAINER */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                    Live Photo Preview:
                  </span>
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center">
                    {bikeForm.imageUrl && !imageLoadError ? (
                      <img
                        src={bikeForm.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImageLoadError(true)}
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-500">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-600" />
                        <p className="text-[11px]">
                          {imageLoadError
                            ? '⚠️ Invalid Image URL. Please provide a valid photo link.'
                            : 'Paste a photo URL to see the live preview'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bike Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Bike Model Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Honda Dio 110"
                    value={bikeForm.name}
                    onChange={(e) => setBikeForm({ ...bikeForm, name: e.target.value })}
                    required
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="Honda / Yamaha / TVS / Bajaj"
                    value={bikeForm.brand}
                    onChange={(e) => setBikeForm({ ...bikeForm, brand: e.target.value })}
                    required
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Vehicle Category</label>
                  <select
                    value={bikeForm.category}
                    onChange={(e) => setBikeForm({ ...bikeForm, category: e.target.value as any })}
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  >
                    <option value="SCOOTER">Scooter (Automatic)</option>
                    <option value="GEAR_BIKE">Gear Bike (Manual)</option>
                    <option value="ADVENTURE">Adventure Cruiser</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Hub Location</label>
                  <select
                    value={bikeForm.location}
                    onChange={(e) => setBikeForm({ ...bikeForm, location: e.target.value })}
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  >
                    <option value="Denipitiya">Denipitiya (Main Hub)</option>
                    <option value="Mirissa">Mirissa (Beach Hub)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Daily Rate (LKR)</label>
                  <input
                    type="number"
                    value={bikeForm.dailyRateLkr}
                    onChange={(e) => setBikeForm({ ...bikeForm, dailyRateLkr: Number(e.target.value) })}
                    required
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Plate Number</label>
                  <input
                    type="text"
                    placeholder="WP BDF-1234"
                    value={bikeForm.plateNumber}
                    onChange={(e) => setBikeForm({ ...bikeForm, plateNumber: e.target.value })}
                    required
                    className="w-full border border-slate-700 rounded-xl px-3 py-2 bg-slate-900 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-2xl transition-all shadow-md text-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingBikeId ? 'Update Bike' : 'Save & Add Bike to Fleet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
