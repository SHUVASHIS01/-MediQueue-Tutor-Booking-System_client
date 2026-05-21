# 🎓 MediQueue – Tutor Booking System (Client)

![MediQueue Banner](https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200)

## 🌐 Live Link

🔗 **[https://medi-queue-tutor-booking-system-cli.vercel.app](https://medi-queue-tutor-booking-system-cli.vercel.app)**

---

## 📖 About The Project

**MediQueue** is a modern, production-ready full-stack tutor booking platform where students can discover, filter, and book verified tutors with a dynamic slot management system. The platform features a sleek dark/light mode UI, Google Authentication, JWT-secured routes, and real-time booking management.

---

## ✨ Key Features

- 🔐 **JWT Authentication** – Secure login/register with email & password
- 🔑 **Google OAuth** – One-click Google Sign-In via Firebase
- 🧑‍🏫 **Browse Tutors** – Search and filter by name and session start date
- 📋 **Tutor Details** – Full profile view with booking slot availability
- 📅 **Session Booking** – Reserve a slot with automatic slot decrement
- 🗓️ **My Bookings** – View and cancel your reserved sessions
- ➕ **Add Tutors** – Create your own tutor listings
- ✏️ **My Tutors** – Edit and delete your own tutor listings
- 🌗 **Dark/Light Mode** – Smooth theme toggle
- 📱 **Fully Responsive** – Optimized for all screen sizes

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **React.js (Vite)** | Frontend Framework |
| **React Router DOM** | Client-side Routing |
| **Tailwind CSS** | Styling & UI |
| **Axios** | HTTP Requests |
| **Firebase** | Google Authentication |
| **Context API** | Global State Management |
| **SweetAlert2** | Beautiful Alerts & Modals |
| **Lucide React** | Icon Library |

---

## 🔗 Related Repository

- 🖥️ **Backend (Server):** [MediQueue Server](https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_server)
- 🌐 **Live Backend API:** [https://medi-queue-tutor-booking-system-ser.vercel.app](https://medi-queue-tutor-booking-system-ser.vercel.app)

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SHUVASHIS01/-MediQueue-Tutor-Booking-System_client.git
   cd -MediQueue-Tutor-Booking-System_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── api/              # Axios instance & interceptors
├── components/       # Reusable UI components (Navbar, Footer, Spinner)
├── context/          # AuthContext & ThemeContext
├── firebase/         # Firebase configuration
├── pages/            # Page-level components
│   ├── Home.jsx
│   ├── Tutors.jsx
│   ├── TutorDetails.jsx
│   ├── AddTutor.jsx
│   ├── MyTutors.jsx
│   ├── MyBookings.jsx
│   ├── Login.jsx
│   └── Register.jsx
└── main.jsx
```

---

## 🚀 Deployment

This project is deployed on **Vercel** with automatic deployments on every push to the `main` branch.

---

## 👨‍💻 Author

**Shuvashis Basak**
- GitHub: [@SHUVASHIS01](https://github.com/SHUVASHIS01)
