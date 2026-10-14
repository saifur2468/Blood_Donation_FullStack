# 🩸 LifeDrop

A web-based Blood Donation Management System designed to connect blood donors with patients who need blood. The platform supports user authentication, blood request management, role-based access, and secure donation-related operations.

## 🌐 Live Project
- **Live Link:** https://blood-donation-full-stack.vercel.app/
- **Backend API:** https://l2-a6-blood-donation.vercel.app/
- **GitHub Repository:** https://github.com/saifur2468/L2-A6-Blood-Donation-Backend

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Backend:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Token (JWT)
- **Payment Integration:** Stripe
- **Deployment:** Vercel

## ✨ Core Features

- 🔐 User authentication and authorization
- 👥 Role-based access control for patients, donors, and administrators
- 🩸 Support for all eight blood groups: A+, A-, B+, B-, AB+, AB-, O+, O-
- 📋 Create and manage blood donation requests
- 🔎 Access API endpoints for user and blood request management
- 💳 Stripe checkout and payment-related integration
- 🔒 Secure API architecture with centralized error handling

## 📸 Project Screenshot


![Blood Donation Management System](https://i.postimg.cc/RV86cYLH/Screenshot-2026-10-12-185413.png)

## 📦 Dependencies

The project uses the following core packages and tools:

- `express` — Backend web framework
- `typescript` — Type-safe JavaScript development
- `prisma` — Database schema and ORM tooling
- `@prisma/adapter-pg` — PostgreSQL adapter for Prisma
- `pg` — PostgreSQL client
- `jsonwebtoken` — JWT-based authentication
- `stripe` — Payment integration

See `package.json` for the complete list of dependencies and development dependencies.

## ⚙️ Run Locally

### Prerequisites

- Node.js
- npm
- PostgreSQL database
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/saifur2468/L2-A6-Blood-Donation-Backend.git
cd L2-A6-Blood-Donation-Backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root and configure the environment variables required by your application.

```env
PORT=5000
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

Use the actual variable names required by your source code and Prisma configuration. Never commit real secrets to GitHub.

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

### Step 5: Set Up the Database

Run the database migration command configured for your Prisma setup. For a development database, this is commonly:

```bash
npx prisma migrate dev
```

### Step 6: Start the Development Server

```bash
npm run dev
```

The server should start at:

`http://localhost:5000`

Use the terminal output to confirm the actual port and server status.

## 🔗 API Resources

- **Live Backend:** https://l2-a6-blood-donation.vercel.app/
- **API Base Path:** `/api/v1`
- **Authentication:** `/api/v1/auth`
- **Users:** `/api/v1/user`
- **Blood Requests:** `/api/v1/blood-request`
- **Payments:** `/api/v1/payment`

Check the source code or API documentation for the available HTTP methods, request bodies, and response formats.
---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
