import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BookOpen, XCircle, ArrowRight, DollarSign, User, ShieldAlert } from 'lucide-react';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'My Booked Sessions - MediQueue';
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/my-bookings?email=${user.email}`);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking? This will replenish the tutor\'s slot.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      background: theme === 'dark' ? '#1e293b' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/api/bookings/${bookingId}/cancel`);
          
          // Update the specific booking status in the local state
          setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
          
          Swal.fire({
            title: 'Cancelled!',
            text: 'Your booking has been cancelled.',
            icon: 'success',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || 'Failed to cancel the booking.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
          });
        }
      }
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">
      
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
          My Booked Sessions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your enrolled classes, print digital session details, or request slot cancellations.
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0f1626] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <BookOpen className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-650 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Bookings Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            You haven't booked any online sessions yet. Explore our top tutors and secure your slots today!
          </p>
          <Link
            to="/tutors"
            className="inline-flex items-center space-x-2 mt-6 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span>Browse Tutors</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* Table Listing */
        <div className="bg-white dark:bg-[#0f1626] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-150 dark:divide-slate-800 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Tutor Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Registered Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Booking Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800 dark:text-slate-150">
                      {booking.tutorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-350">
                      <div className="flex items-center space-x-1.5">
                        <User size={14} className="text-slate-400" />
                        <span>{booking.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                      {booking.studentEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        booking.status === 'booked' 
                          ? 'bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400' 
                          : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                      }`}>
                        {booking.status === 'booked' ? 'Booked' : 'Cancelled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {booking.status === 'booked' ? (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-semibold text-xs transition-colors"
                        >
                          <XCircle size={14} />
                          <span>Cancel Slot</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 flex items-center justify-end space-x-1">
                          <ShieldAlert size={14} />
                          <span>Slot Released</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
