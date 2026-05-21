import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import TutorDetails from './pages/TutorDetails';
import AddTutor from './pages/AddTutor';
import MyTutors from './pages/MyTutors';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const location = useLocation();

  // Scroll to top and set document title on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    const path = location.pathname;
    if (path === '/') {
      document.title = 'MediQueue – Tutor Booking System';
    } else if (path === '/tutors') {
      document.title = 'Available Tutors – MediQueue';
    } else if (path.startsWith('/tutors/')) {
      document.title = 'Tutor Details – MediQueue';
    } else if (path === '/add-tutor') {
      document.title = 'Add Tutor – MediQueue';
    } else if (path === '/my-tutors') {
      document.title = 'My Tutors – MediQueue';
    } else if (path === '/my-bookings') {
      document.title = 'My Booked Sessions – MediQueue';
    } else if (path === '/login') {
      document.title = 'Login – MediQueue';
    } else if (path === '/register') {
      document.title = 'Register – MediQueue';
    } else {
      document.title = '4504 Page Not Found – MediQueue';
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-305">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route 
            path="/tutors/:id" 
            element={
              <PrivateRoute>
                <TutorDetails />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/add-tutor" 
            element={
              <PrivateRoute>
                <AddTutor />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/my-tutors" 
            element={
              <PrivateRoute>
                <MyTutors />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/my-bookings" 
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
