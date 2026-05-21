import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import { 
  User, 
  BookOpen, 
  Clock, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Award, 
  Layers, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import Swal from 'sweetalert2';

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    document.title = 'Tutor Details - MediQueue';
    fetchTutorDetails();
  }, [id]);

  const fetchTutorDetails = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/tutors/${id}`);
      setTutor(data);
    } catch (error) {
      console.error('Error fetching tutor details:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to retrieve tutor details.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      navigate('/tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      Swal.fire({
        title: 'Missing Phone',
        text: 'Please input a valid phone number to book.',
        icon: 'warning',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      return;
    }

    setBookingLoading(true);

    const payload = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      studentName: user.displayName || 'Anonymous Student',
      studentEmail: user.email,
      studentPhone: phone
    };

    try {
      const { data } = await axiosSecure.post('/api/bookings', payload);
      
      // Update local tutor state with decreased slots
      setTutor(prev => ({
        ...prev,
        totalSlots: data.remainingSlots
      }));
      
      setBookingModalOpen(false);
      setPhone('');

      Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your slot with ${tutor.name} has been successfully reserved.`,
        icon: 'success',
        confirmButtonText: 'Go to My Bookings',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/my-bookings');
        }
      });
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Booking Blocked',
        text: error.response?.data?.message || 'Failed to complete booking.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!tutor) {
    return null;
  }

  // Pre-checks for booking limits on UI
  const currentDate = new Date();
  const sessionDate = new Date(tutor.sessionStartDate);
  const isDateRestricted = currentDate < sessionDate;
  const isSlotRestricted = tutor.totalSlots <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-[#0f1626] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sm:p-12 transition-all duration-300">
        
        {/* Main Details Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Tutor Image Box */}
          <div className="w-full lg:w-2/5 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 aspect-square">
              <img 
                src={tutor.image} 
                alt={tutor.name} 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <span className="absolute top-4 right-4 px-4 py-1.5 text-xs font-bold text-white bg-primary-600 rounded-full">
                {tutor.subject}
              </span>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Hourly Fee:</span>
                <span className="font-extrabold text-slate-800 dark:text-white flex items-center">
                  <DollarSign size={16} />
                  {tutor.hourlyFee} USD/hr
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Available Slots:</span>
                <span className={`font-bold ${tutor.totalSlots > 0 ? 'text-teal-500' : 'text-red-500'}`}>
                  {tutor.totalSlots} left
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Teaching Mode:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tutor.teachingMode}
                </span>
              </div>
            </div>
          </div>

          {/* Tutor Descriptions */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
                {tutor.name}
              </h1>
              
              <div className="flex items-center space-x-2 mb-6">
                <Award className="h-5 w-5 text-teal-500" />
                <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                  {tutor.experience} Experience &bull; {tutor.institution}
                </span>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 mb-6" />

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">Tutor Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-400 block uppercase tracking-wider">Schedule Slots</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {tutor.availableDays.join(', ')} ({tutor.availableTime})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-400 block uppercase tracking-wider">Session Starts</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 font-sans">
                        {new Date(tutor.sessionStartDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-400 block uppercase tracking-wider">Location</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {tutor.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-slate-400" />
                    <div>
                      <span className="text-xs text-slate-400 block uppercase tracking-wider">Creator Contact</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                        {tutor.createdBy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Booking Check / Actions Box */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
              
              {/* Conditional Alert message warnings based on requirements */}
              {isSlotRestricted ? (
                <div className="flex items-start space-x-3 p-4 mb-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                  <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">No available slots left.</p>
                    <p className="text-xs mt-0.5">This session is fully booked. You can’t join at the moment.</p>
                  </div>
                </div>
              ) : isDateRestricted ? (
                <div className="flex items-start space-x-3 p-4 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Booking is not available yet for this tutor</p>
                    <p className="text-xs mt-0.5">Registration opens on the session start date: {new Date(tutor.sessionStartDate).toLocaleDateString()}.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3 p-4 mb-4 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30">
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Booking Slots Open</p>
                    <p className="text-xs mt-0.5">You can secure a learning session. Total available slots: {tutor.totalSlots}.</p>
                  </div>
                </div>
              )}

              {/* Booking Trigger Button */}
              <button
                onClick={() => setBookingModalOpen(true)}
                disabled={isSlotRestricted || isDateRestricted}
                className="w-full sm:w-auto py-3 px-8 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-xl shadow-lg hover:shadow-primary-500/20 focus:outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                Book Session Now
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Booking Form Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#0f1626] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 animate-scaleUp relative">
            
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setPhone('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-slate-350 transition-colors"
            >
              <XCircle size={24} />
            </button>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent mb-2">
              Book Learning Session
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Confirm your booking credentials and enter your phone number to secure a digital session token.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={user.displayName || 'Anonymous Student'}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Student Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Tutor Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Tutor Name
                </label>
                <input
                  type="text"
                  value={tutor.name}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Tutor ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Tutor ID Reference
                </label>
                <input
                  type="text"
                  value={tutor._id}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingModalOpen(false);
                    setPhone('');
                  }}
                  className="py-2 px-4 border border-slate-250 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="py-2 px-6 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-lg shadow-lg hover:shadow-primary-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                >
                  {bookingLoading ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Confirm Reservation</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default TutorDetails;
