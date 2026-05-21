# 🎓 MediQueue – Tutor Booking System

MediQueue is a professional, high-end tutor booking platform where students can find qualified academic mentors, reserve learning sessions with automatic conflict prevention, and manage their schedule. Tutors can easily manage their listings, monitor active bookings, and maintain full transparency on slot limits.

---

## 🎯 Key Features
- **Dynamic Tutor Search & Filtering**: Discover mentors instantly with real-time text-based search (regex case-insensitive) and session start-date range constraints.
- **Conflict-Protected Slot Management**: Advanced transaction-safe booking system prevents slot double-booking, decrementing available slots atomically and replenishing them immediately on cancellation.
- **Secure JWT & Firebase Auth**: Dual-layered protection combining Firebase Authentication (email/password & Google login) on the client and custom signed JSON Web Tokens (JWT) verified on protected REST endpoints.
- **Dynamic Dark/Light Mode Theme**: Seamless glassmorphism design with a global theme context that updates the body styles instantly and persists user preference.
- **Robust Student & Tutor Dashboards**: Fully responsive management layouts to review active bookings, add new tutor profiles, modify experience details in-line, or cancel scheduled classes.
- **User-Friendly Validation Alerts**: Built-in validation checks (e.g., email verification, minimum 6-character passwords with casing checks) powered by custom spinner feedback and SweetAlert2 notifications.

---

## ⚙️ Tech Stack

### Frontend
- **Framework**: React.js (Vite configuration)
- **Routing**: React Router DOM (v7)
- **State Management**: React Context API (`AuthContext` and `ThemeContext`)
- **HTTP Client**: Axios (with custom interceptors attaching bearer JWT tokens)
- **Styling**: Tailwind CSS (v4) with custom glassmorphism layers
- **Feedback & Utilities**: SweetAlert2, Lucide React icons, Framer Motion transitions

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas via Mongoose ORM
- **Security**: JWT (`jsonwebtoken` token generation) & `cookie-parser` cookie verification
- **CORS**: Configured origin security supporting client deployment domains

---

## 🚀 Installation & Local Run Guide

### Prerequisite
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 1. Clone & Set Up the Repository
```bash
# Clone the repository
git clone https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_client.git client
git clone https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_server.git server
```

### 2. Configure Backend Server
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of `server/` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://shuvashisbasak_db_user:foJ5rlBZmSMspzIX@cluster0.mwjkjm7.mongodb.net/mediqueue?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=mediqueue_secret_key_123456_super_secure
   NODE_ENV=development
   ```
4. Start the backend developer server:
   ```bash
   npm run dev
   ```

### 3. Configure Frontend Client
1. Navigate to the `client/` directory:
   ```bash
   cd ../client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of `client/` with the following configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_API_URL=http://localhost:5000
   ```
   *(If env values are left empty, the project uses integrated fallback placeholders to prevent build compilation errors).*
4. Start the frontend developer server:
   ```bash
   npm run dev
   ```

---

## 📁 Repository Links
- **Client Repository**: [MediQueue Client](https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_client)
- **Server Repository**: [MediQueue Server](https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_server)
