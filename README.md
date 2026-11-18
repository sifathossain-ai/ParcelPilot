# ParcelPilot 🚀
**AI-Assisted Address Structuring and Courier Booking Automation for Bangladeshi F-commerce Sellers**

A Software Engineering Capstone Project at Daffodil International University (DS 331).

---

## 📌 Project Overview
ParcelPilot automates the order processing pipeline for Bangladeshi F-commerce merchants:
1. **Raw Message Input:** Sellers paste messy, informal Bangla/Banglish customer chat orders.
2. **AI Structuring:** LLM extraction parses Customer Name, Phone, Full Address, Thana, District, and COD Amount into structured JSON.
3. **Lead Management:** Orders are saved to PostgreSQL via TypeORM with status `READY_TO_BOOK`.
4. **1-Click Courier Dispatch:** Dispatches orders to Steadfast Courier API and automatically persists tracking codes.

---

## 🛠️ Tech Stack
- **Frontend (`/client`):** Next.js (App Router), React, Tailwind CSS, DaisyUI, Axios
- **Backend (`/server`):** NestJS (TypeScript), TypeORM, PostgreSQL, class-validator, bcryptjs, JWT
- **AI Engine:** LLM (OpenAI / Gemini) structured JSON extraction
- **Courier API:** Steadfast Courier REST API integration

---

## 📂 Repository Structure
```
ParcelPilot/
├── client/                     # Next.js Frontend Application
│   ├── src/app/                # App Router (auth, dashboard, orders)
│   ├── src/components/         # UI Components (PasteBox, OrderTable, CourierModal)
│   └── src/lib/api.ts          # Axios API Client
│
├── server/                     # NestJS Backend API
│   ├── src/
│   │   ├── auth/               # User Authentication & JWT Strategy
│   │   ├── users/              # User Entity (TypeORM) & Service
│   │   ├── orders/             # Order Entity (TypeORM) & CRUD
│   │   ├── ai/                 # LLM Prompt & Bangla Extraction Service
│   │   └── courier/            # Steadfast Courier Booking API Client
│   └── .env.example
│
├── ParcelPilot_Project_Documentation.docx # Capstone Progress Report (Word)
├── PROJECT_DOCUMENTATION.md    # Detailed Capstone Architecture & Defense Guide
└── README.md
```

---

## 👥 Team Information (Batch 41, Section D2)
- **Sifat Hossain (ID: 232-350-258):** AI Address Extraction Engine & Backend Architecture
- **Nazmus Sakib (ID: 232-35-116):** Authentication Module & Order Management UI
- **Mst Sabikun Nahar Mukta (ID: 232-35-215):** Courier API Integration & Order Dispatch

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+ (Tested on v22)
- PostgreSQL running on `localhost:5432`

### 2. Backend Setup (`server`)
```bash
cd server
cp .env.example .env
npm install
npm run start:dev
```
Backend runs on: `http://localhost:5000`

### 3. Frontend Setup (`client`)
```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`
