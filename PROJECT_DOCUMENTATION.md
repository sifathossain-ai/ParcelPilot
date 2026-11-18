# ParcelPilot: AI-Assisted Address Structuring and Courier Booking Automation for F-commerce Sellers

**Daffodil International University (DIU)**  
**Department of Software Engineering**  
**Course Code:** DS 331 | **Course Name:** Software Engineering Design Capstone Project  
**Course Teacher:** Md. Mahedi Hassan (Senior Lecturer)  
**Semester:** Fall 2026 | **Batch:** 41 | **Section:** D2  

---

## 👥 Team Information & Ownership Distribution

| Student Name | Student ID | Designated Project Role | Technical Module Ownership |
|---|---|---|---|
| **Sifat Hossain** | 232-350-258 | Lead Developer / AI & Architecture | AI Address Extraction Pipeline & NestJS Core APIs |
| **Nazmus Sakib** | 232-35-116 | Fullstack / Auth & Frontend | Authentication (Bcrypt+DB) & Orders Dashboard UI |
| **Mst Sabikun Nahar Mukta** | 232-35-215 | Integration / Courier & QA | Steadfast Courier API Integration & Order Dispatch |

---

## 1. Executive Summary & Problem Statement

In Bangladesh, over 400,000 small merchants sell products through Facebook pages and WhatsApp messages (F-commerce). Customers write delivery addresses in informal, messy Bangla or Banglish with missing district/thana details, spelling errors, and colloquial landmarks (e.g., *"মিরপুর ১০ গোলচক্করের পেছনে রহিম বিল্ডিং ৩য় তলা, ফোন ০১৭..."*).

### The Current Problems:
1. **Manual Labor Bottleneck:** Sellers spend 4–5 minutes per order manually copying and formatting addresses into courier portals.
2. **High Return Rates (RTO):** Misinterpreted addresses or wrong Thana/Hub selection cause courier delivery failures, costing merchants return penalties.
3. **Fragmented Records:** Tracking numbers, COD amounts, and order statuses are scattered across chat histories, courier websites, and notebooks.

### ParcelPilot Solution:
ParcelPilot is an AI-powered automation platform where sellers simply paste raw chat messages. The system leverages LLM extraction with strict JSON schemas to extract customer details, stores them in PostgreSQL via TypeORM, renders an editable dashboard, and enables **one-click courier booking via Steadfast Courier API**, instantly saving consignment tracking numbers.

---

## 2. Technical Stack (Approved Capstone Architecture)

| Layer | Technology | Rationale & Responsibility |
|---|---|---|
| **Frontend** | **Next.js (React), Tailwind CSS, DaisyUI** | Fast, responsive seller dashboard, Chat-style paste box, editable order tables, and courier booking modals. |
| **Backend** | **NestJS (TypeScript)** | Enterprise-grade modular MVC architecture, RESTful API endpoints, DTOs, and validation pipes. |
| **Database & ORM** | **PostgreSQL + TypeORM** | Relational data persistence with TypeORM entities (`User`, `Order`), relational foreign keys, and migrations. |
| **AI / NLP Engine** | **Gemini API / OpenAI API** | Structured JSON extraction from informal Bangla & Banglish messages. |
| **Courier Integration** | **Steadfast Courier API** | Automated parcel consignment creation and tracking code generation. |
| **Security & Auth** | **class-validator, bcryptjs, JWT** | Salted password hashing, stateless token authentication, and strict payload validation. |

---

## 3. Core Functional Modules for Live Demonstration

To meet DIU assessment guidelines, the following 4 modules demonstrate complete end-to-end functionality backed by database persistence:

### Module 0: Authentication Module (Compulsory)
- **Features:** Seller Registration, Login, and Protected Routes.
- **Security:** Passwords hashed with `bcryptjs` (salt rounds: 10). No hardcoded credentials.
- **Database Interaction:** Persisted in PostgreSQL `users` table via TypeORM repository.

### Core Feature 1: Raw Message Paste & AI Address Structuring
- **Features:** Chat-style input box for raw Bangla/Banglish customer text.
- **AI Processing:** Structured JSON extraction parsing:
  - Customer Name
  - Phone Number (validated using BD regex `01[3-9]\d{8}`)
  - Full Address
  - Thana & District
  - COD Amount
- **Database Interaction:** Extracted details saved to PostgreSQL `orders` table with status `READY_TO_BOOK`.

### Core Feature 2: Lead & Order Lifecycle Management Dashboard
- **Features:** Table view of all customer orders with status filters (`PENDING`, `READY_TO_BOOK`, `BOOKED`).
- **Inline Editing:** Sellers can review extracted data and fix typos before courier dispatch.
- **Database Interaction:** TypeORM queries for fetching, updating, and filtering orders by seller ID.

### Core Feature 3: Automated Multi-Courier Booking ("Call Courier")
- **Features:** "Book Courier" modal with courier selection (Steadfast Courier).
- **Auto-Fill & Dispatch:** Delivery information is auto-populated from the database order record. Clicking "Confirm Booking" calls the Steadfast Courier API.
- **Database Interaction:** Consignment Tracking ID is received and stored in PostgreSQL; order status transitions to `BOOKED`.

---

## 4. Database Schema (TypeORM Entities)

### `User` Entity (`users` table)
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  shopName: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;
}
```

### `Order` Entity (`orders` table)
```typescript
export enum OrderStatus {
  PENDING = 'PENDING',
  READY_TO_BOOK = 'READY_TO_BOOK',
  BOOKED = 'BOOKED',
  DELIVERED = 'DELIVERED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'text' })
  rawMessage: string;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column({ type: 'text' })
  fullAddress: string;

  @Column({ nullable: true })
  thana: string;

  @Column({ nullable: true })
  district: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  codAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.READY_TO_BOOK })
  status: OrderStatus;

  @Column({ nullable: true })
  courierName: string;

  @Column({ nullable: true })
  trackingCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

---

## 5. Individual Defense Guide (Viva & Git Commits)

### 👤 Sifat Hossain (Lead / AI & Core Backend)
* **Assigned Ownership:** AI Address Extraction Pipeline & NestJS Core APIs.
* **Key Git Commits:**
  - `feat(ai): integrate LLM prompt for informal bangla address extraction`
  - `feat(orders): create extract-order API route with JSON validation`
* **Viva Defense Answer:**
  > *"I engineered the backend API architecture in NestJS and the AI extraction service. When a raw Bangla or Banglish chat is received, my service prompts the LLM with a strict JSON schema. It extracts Name, Phone (validated using BD regex), Address, Thana, District, and COD, handling spelling variations and colloquial landmarks."*

### 👤 Nazmus Sakib (Auth & Dashboard UI)
* **Assigned Ownership:** Authentication Module & Orders Dashboard UI.
* **Key Git Commits:**
  - `feat(auth): implement user registration and login with bcrypt hashing`
  - `feat(ui): build orders data table with live status filtering`
* **Viva Defense Answer:**
  > *"I developed the secure authentication module and the responsive seller dashboard UI. I implemented bcryptjs password hashing before saving credentials to PostgreSQL to guarantee zero plain-text storage. On the frontend, I built the order management table where sellers can filter, search, and edit extracted customer details."*

### 👤 Mst Sabikun Nahar Mukta (Courier Integration & Dispatch)
* **Assigned Ownership:** Steadfast Courier API Integration & Order Dispatch Engine.
* **Key Git Commits:**
  - `feat(courier): integrate steadfast courier booking API service`
  - `feat(dispatch): add courier selection modal and persist tracking ID`
* **Viva Defense Answer:**
  > *"I engineered the courier booking integration. When the seller initiates delivery, my module opens the courier modal, pulls the customer info from PostgreSQL, and issues an automated POST request to the Steadfast Courier API. When the courier returns a tracking code, my code saves it to the database and marks the order as Booked."*

---

## 6. Individual Contribution Report Checklist (For BLC Submission)

Each member must submit their own report with a cover page on DIU BLC. To avoid zero marks for similarity:
1. **Roles & Responsibilities:** Clearly state your designated module.
2. **Functional Requirements Implemented:** Describe your module in detail with file references.
3. **R&D & Learning Performed:** Document what you learned (e.g., prompt design, bcrypt security, or courier API payload format).
4. **Technical Challenges Faced:** Mention specific hurdles solved during implementation.
5. **AI Tools Used:** List specific prompts used during development.
6. **Evidence:** Attach screenshots of your working feature, database records, and Git commit history.
