import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  XCircle,
  ArrowRight,
  User,
  ShieldAlert,
  CalendarCheck,
} from 'lucide-react';
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
      text: "Are you sure you want to cancel this booking? This will replenish the tutor's slot.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      background: theme === 'dark' ? '#1e293b' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/api/bookings/${bookingId}/cancel`);

          // Update the specific booking status in the local state
          setBookings((prev) =>
            prev.map((b) => (b._id === bookingId ? { ...b, status: 'cancelled' } : b))
          );

          Swal.fire({
            title: 'Cancelled!',
            text: 'Your booking has been cancelled.',
            icon: 'success',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || 'Failed to cancel the booking.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          });
        }
      }
    });
  };

  if (loading) {
    return <Spinner />;
  }

  const bookedCount = bookings.filter((b) => b.status === 'booked').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 min-h-[75vh]">

      {/* ── PAGE HEADER ── */}
      <div className="mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/30 px-4 py-1.5 rounded-full mb-4">
          My Dashboard
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
              My Booked{' '}
              <span className="bg-gradient-to-r from-primary-500 via-teal-400 to-primary-400 bg-clip-text text-transparent">
                Sessions
              </span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-lg leading-relaxed">
              Review your enrolled classes, track session status, or request slot cancellations below.
            </p>
          </div>
          {bookings.length > 0 && (
            <div className="flex-shrink-0 flex items-center gap-3 bg-white dark:bg-[#0f1626] border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 shadow-sm">
              <CalendarCheck size={18} className="text-teal-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Bookings</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white leading-none mt-0.5">
                  {bookedCount}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── EMPTY STATE ── */}
      {bookings.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#0f1626] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-5">
            <BookOpen className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Bookings Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
            You haven't booked any online sessions yet. Explore our top tutors and secure your slots today!
          </p>
          <Link
            to="/tutors"
            className="inline-flex items-center space-x-2 mt-7 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-xl shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Browse Tutors</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* ── TABLE CARD ── */
        <div className="bg-white dark:bg-[#0f1626] rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">

          {/* Gradient accent bar at top of table header */}
          <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-teal-400 to-primary-400" />

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-left">

              {/* ── TABLE HEAD ── */}
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/60">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Tutor Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Registered Email
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Booking Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ── TABLE BODY ── */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`transition-colors duration-150 hover:bg-primary-50/40 dark:hover:bg-primary-950/10 ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-transparent'
                        : 'bg-slate-50/50 dark:bg-slate-900/20'
                    }`}
                  >
                    {/* Tutor Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {booking.tutorName}
                      </span>
                    </td>

                    {/* Student Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-350">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-slate-400 flex-shrink-0" />
                        <span>{booking.studentName}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                      {booking.studentEmail}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.status === 'booked' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                          Booked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Cancelled
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {booking.status === 'booked' ? (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-xs transition-all hover:shadow-sm hover:border-red-300"
                        >
                          <XCircle size={13} />
                          <span>Cancel Slot</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 flex items-center justify-end gap-1">
                          <ShieldAlert size={13} />
                          <span>Slot Released</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer summary */}
          <div className="px-6 py-4 bg-slate-50/60 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing{' '}
              <span className="font-bold text-slate-700 dark:text-slate-300">{bookings.length}</span>{' '}
              booking{bookings.length !== 1 ? 's' : ''} total
            </p>
            <Link
              to="/tutors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
            >
              Book more sessions
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
