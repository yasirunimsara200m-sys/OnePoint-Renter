# 🛵 OnePoint Renter - Sri Lanka Bike & Scooter Rental Platform

**OnePoint Renter** යනු ශ්‍රී ලංකාව තුළ ස්කූටර් (Honda Dio, Yamaha RayZR, TVS Ntorq) සහ ගියර් බයික් (Yamaha FZ, Bajaj Pulsar, Honda Hornet, Royal Enfield) රෙන්ට් කිරීම සඳහාම විශේෂයෙන් නිර්මාණය කරන ලද සම්පූර්ණ Full-Stack Web Platform එකකි.

---

## 🌟 ප්‍රධාන අංග සහ විශේෂාංග (Key Features)

### 1. පාරිභෝගික අත්දැකීම (Customer Experience)
- **Fleet Showcase & Filters**: ස්කූටර් (Automatic), ගියර් බයික් (Manual), Adventure වර්ගීකරණය.
- **Sri Lanka Hubs**: Colombo, Mirissa, Weligama, Ella, Kandy, Negombo ආදී ප්‍රධාන සංචාරක සහ නගර කලාප.
- **Dynamic Price Calculator**: දින ගණන අනුව ගණනය වීම, සතියකට වැඩි කාලයක් සඳහා Discounts සහ අමතර Helmet (හිස් ආවරණ) ගාස්තු.
- **WhatsApp 1-Click Instant Booking**: බයික් එක සහ දින තේරූ පසු සම්පූර්ණ විස්තර සහිතව OnePoint WhatsApp අංකයට සෘජුවම መልපතක් (Message) යැවීම.
- **Tourist & Riding Guide**: ශ්‍රී ලංකාවේ මාර්ග නීති, Driving License & IDP නීති, Helmet නීති සහ හදිසි සහන සේවා (Roadside Assistance).
- **Floating 24/7 WhatsApp Widget**: ඕනෑම පිටුවක සිට වහාම WhatsApp හරහා සම්බන්ධ වීමේ පහසුකම.

### 2. පරිපාලක පැනලය (Admin Panel - `/opv-admin`)
- **ආරක්ෂිත Login පද්ධතිය**:
- **Dashboard Overview**: මුළු බයික් ගණන, දැනට පාරේ ධාවනය වන බයික් (Active Rentals), අනුමැතිය බලාපොරොත්තුවන Bookings (Pending) සහ මුළු ආදායම (LKR).
- **Bookings Management**: Bookings අනුමත කිරීම, බයික් එක පාරිභෝගිකයාට ලබා දීම (Handover), බයික් එක නැවත භාරගැනීම (Returned).
- **1-Click WhatsApp Customer Contact**: සෑම Booking එකක් සඳහාම පාරිභෝගිකයාගේ WhatsApp එකට කෙලින්ම Approved හෝ Reminder පණිවිඩ යැවීමේ පහසුකම.
- **Fleet Management**: නව බයික් එකතු කිරීම (Add Bike), පින්තූර, දෛනික මිල ගණන් සහ Availability තත්ත්වය වෙනස් කිරීම.
- **Handover Checklist**: Driving License, Passport, NIC සහ බයික් එකේ තත්ත්වය (Damage Inspection) පරීක්ෂා කිරීමේ මාර්ගෝපදේශය.

### 3. පසු කාලීනව Mobile App එකක් (Android & iOS) බවට පත් කිරීම
- Backend එක **Nest.js REST API** වලින් ස්වාධීනව ගොඩනගා ඇති බැවින්, අනාගතයේදී **Flutter** හෝ **React Native** මඟින් Mobile App එකක් හදන විට මේ Backend API එකම කෙලින්ම සම්බන්ධ කළ හැක.
- Frontend එක **Next.js PWA (Progressive Web App)** පහසුකම සඳහා සුදානම් කර ඇත.

---

## 🏗️ තාක්ෂණික පද්ධතිය (Tech Stack)

| Component | Technology | Description |
|---|---|---|
| **Backend API** | Nest.js (TypeScript) | Scalable Enterprise REST API Architecture |
| **Database** | PostgreSQL | Relational Database with Prisma ORM |
| **Frontend** | Next.js 14 (App Router) | High Performance, SEO Friendly & Mobile Responsive |
| **Styling** | Tailwind CSS | Modern aesthetic UI with custom color palettes |
| **Icons** | Lucide React | Clean, lightweight SVG icon system |
| **Messaging** | WhatsApp Deep Links & Webhooks | Instant click-to-chat & automated messaging templates |
| **Auth** | JWT & Bcrypt | Secure role-based token authentication (Admin/User) |

---

## 📁 Project Structure

```
OnePoint-Rent Vehical/
├── docker-compose.yml       # Local PostgreSQL database container setup
├── setup.bat                # 1-Click Dependency Installer (Windows)
├── start.bat                # 1-Click Project Launcher (Windows)
│
├── backend/                 # Nest.js API & Database Service
│   ├── prisma/
│   │   ├── schema.prisma    # PostgreSQL Schema (Bikes, Bookings, Users, Documents)
│   │   └── seed.ts          # Sri Lankan sample bikes seed data
│   ├── src/
│   │   ├── auth/            # JWT authentication & Admin login
│   │   ├── bikes/           # Fleet management & CRUD
│   │   ├── bookings/        # Reservation engine & pricing logic
│   │   ├── whatsapp/        # WhatsApp link generator & notification service
│   │   ├── verification/    # NIC & Driving license documents module
│   │   ├── app.module.ts
│   │   └── main.ts          # Swagger docs & CORS configuration
│   └── .env                 # Database URL, JWT secrets & WhatsApp number
│
└── frontend/                # Next.js Web Portal & Admin Panel
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx     # Customer Home & Fleet Explorer
    │   │   ├── opv-admin/   # Complete Admin Management Dashboard (/opv-admin)
    │   │   ├── layout.tsx
    │   │   └── globals.css
    │   ├── components/      # Navbar, Footer, BikeCard, BookingModal, WhatsAppButton
    │   ├── lib/             # API integration client with fallback data
    │   └── types/           # TypeScript definitions
    └── tailwind.config.js
```

---

## 🚀 පද්ධතිය ක්‍රියාත්මක කරන ආකාරය (How to Run)

### ක්‍රමය 1: 1-Click Windows Scripts (පහසුම ක්‍රමය)
1. **Setup run කරන්න**:
   `setup.bat` double click කරන්න. (Backend සහ Frontend සඳහා අවශ්‍ය සියලුම packages ස්වයංක්‍රීයව install වේ).
2. **Project එක Run කරන්න**:
   `start.bat` double click කරන්න. (Backend එක සහ Frontend එක වෙන වෙනම Command prompt windows 2ක විවෘත වේ).

---

### ක්‍රමය 2: Manual Terminal Commands

#### 1. Backend ධාවනය කිරීම:
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```
- Backend API: `http://localhost:5000`
- Swagger API Documentation: `http://localhost:5000/api/docs`

#### 2. Frontend ධාවනය කිරීම:
```bash
cd frontend
npm install
npm run dev
```
- Customer Web Portal: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/opv-admin`

#### 3. Database (PostgreSQL):
Docker ස්ථාපනය කර ඇත්නම්:
```bash
docker-compose up -d
```
හෝ Cloud PostgreSQL (Supabase, Neon, Railway) භාවිතා කරන්නේ නම් `backend/.env` ගොනුවේ ඇති `DATABASE_URL` එකට ඔබේ Database link එක ලබා දෙන්න.

---

## 💬 WhatsApp ව්‍යාපාරික අංකය වෙනස් කිරීම
`backend/.env` ගොනුවේ සහ `frontend/src/lib/api.ts` හි ඇති `WHATSAPP_PHONE_NUMBER` අගය ඔබගේ නිල WhatsApp අංකයට වෙනස් කරන්න (උදා: `9477xxxxxxx` රටේ කේතය සහිතව).
