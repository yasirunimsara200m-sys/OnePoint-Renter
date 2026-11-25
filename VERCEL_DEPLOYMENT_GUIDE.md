# 🚀 OnePoint Renter - Vercel Deployment Guide

This project is fully configured for deployment on **Vercel** with zero-configuration serverless execution.

---

## ⚡ Option 1: 1-Click Recommended Deployment (Frontend + Serverless API)

Your Next.js project now contains built-in serverless API endpoints (`/api/bikes`, `/api/bookings`, `/api/health`). This means **both the customer website, the admin panel, and the backend API run together seamlessly on Vercel** without needing a separate server or continuous hosting fees!

### Steps to Deploy:
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "OnePoint Renter complete build"
   git remote add origin https://github.com/<your-username>/onepoint-renter.git
   git push -u origin main
   ```

2. **Open [Vercel](https://vercel.com) & Import**:
   - Click **"Add New"** > **"Project"**
   - Select your GitHub repository `onepoint-renter`
   - In **Framework Preset**, select **Next.js**
   - If deploying from the root repository:
     - Root directory can stay as `./` (as configured with root `vercel.json`), OR click **Edit** and choose `frontend`.

3. **Environment Variables (Optional / Recommended)**:
   Add these in Vercel Project Settings > Environment Variables:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `94770000000` (Replace with your actual business WhatsApp number)
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_cYeGVM1ESoi3@ep-proud-cake-beq5fotp-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` (Your Neon Cloud DB)

4. **Click "Deploy"**:
   - Vercel will build and assign you a live HTTPS domain (e.g. `https://onepoint-renter.vercel.app`).
   - Your Favicon, Customer Site, Admin Dashboard (`/opv-admin`), and APIs (`/api/bikes`) will all be 100% operational immediately!

---

## 🛠️ Admin Dashboard Access (`/opv-admin`)
- **Direct Secret URL**: `https://<your-vercel-domain>/opv-admin`
- **Authorized Email**: `admin@onepoint.lk`
- **Authorized Password**: `Admin@123`
- **Persistent Session**: Once logged in, your session is saved in secure local storage, so refreshing or reopening the browser keeps you signed in until you click **Logout**.
