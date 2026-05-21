import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import {
  Edit,
  Trash2,
  Layers,
  Plus,
  XCircle,
  User,
  Image,
  BookOpen,
  DollarSign,
  Clock,
  Calendar,
  Award,
  MapPin,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Spanish',
  'History',
  'Coding',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* ─── Shared style tokens ───────────────────────────────────────────────── */
const INPUT_CLS =
  'w-full pl-10 pr-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:text-white transition-colors';
const LABEL_CLS =
  'block text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5';
const ICON_WRAP =
  'absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none';

const MyTutors = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    subject: '',
    availableDays: [],
    availableTime: '',
    hourlyFee: '',
    totalSlots: '',
    sessionStartDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: '',
  });

  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    document.title = 'My Created Tutors - MediQueue';
    fetchMyTutors();
  }, []);

  const fetchMyTutors = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/my-tutors?email=${user.email}`);
      setTutors(data);
    } catch (error) {
      console.error('Error fetching my tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! All slot reservations remain, but this tutor listing will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: theme === 'dark' ? '#1e293b' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/tutors/${id}`);
          setTutors((prev) => prev.filter((t) => t._id !== id));
          Swal.fire({
            title: 'Deleted!',
            text: 'Your tutor listing has been deleted.',
            icon: 'success',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the tutor.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          });
        }
      }
    });
  };

  const openEditModal = (tutor) => {
    setCurrentTutor(tutor);
    const date = new Date(tutor.sessionStartDate);
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({
      name: tutor.name,
      image: tutor.image,
      subject: tutor.subject,
      availableDays: tutor.availableDays,
      availableTime: tutor.availableTime,
      hourlyFee: tutor.hourlyFee,
      totalSlots: tutor.totalSlots,
      sessionStartDate: formattedDate,
      institution: tutor.institution,
      experience: tutor.experience,
      location: tutor.location,
      teachingMode: tutor.teachingMode,
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditDayChange = (day) => {
    const updatedDays = [...formData.availableDays];
    if (updatedDays.includes(day)) {
      updatedDays.splice(updatedDays.indexOf(day), 1);
    } else {
      updatedDays.push(day);
    }
    setFormData({ ...formData, availableDays: updatedDays });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (formData.availableDays.length === 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please select at least one available day.',
        icon: 'warning',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
      return;
    }

    setUpdateLoading(true);

    const payload = {
      ...formData,
      hourlyFee: Number(formData.hourlyFee),
      totalSlots: Number(formData.totalSlots),
      createdBy: user.email,
    };

    try {
      const { data } = await axiosSecure.put(`/api/tutors/${currentTutor._id}`, payload);
      setTutors((prev) => prev.map((t) => (t._id === currentTutor._id ? data : t)));
      setEditModalOpen(false);
      setCurrentTutor(null);
      Swal.fire({
        title: 'Tutor Updated!',
        text: 'Tutor profile details have been successfully saved.',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Update Failed',
        text: error.response?.data?.message || 'Something went wrong.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">

      {/* ── Premium Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
        <div>
          {/* Badge pill */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900 mb-3">
            <GraduationCap size={12} />
            Tutor Management
          </span>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent leading-tight">
              My Created Tutors
            </h1>
            {/* Count badge */}
            {tutors.length > 0 && (
              <span className="inline-flex items-center justify-center h-7 min-w-[1.75rem] px-2 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                {tutors.length}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-lg leading-relaxed">
            Manage your personal tutor listings — edit scheduling, update fees, or remove profiles.
          </p>
        </div>

        <Link
          to="/add-tutor"
          className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white rounded-xl shadow-lg shadow-primary-500/20 font-semibold hover:-translate-y-0.5 transition-all duration-200 text-sm"
        >
          <Plus size={16} />
          <span>Add New Tutor</span>
        </Link>
      </div>

      {/* ── Empty State ──────────────────────────────────────────────── */}
      {tutors.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0f1626] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-slate-50 dark:bg-slate-800/60 mb-5 mx-auto">
            <Layers className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Tutors Listed</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            You haven't listed any tutor profiles yet. Create one now to open slots for students!
          </p>
          <Link
            to="/add-tutor"
            className="inline-flex items-center gap-2 mt-7 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus size={14} />
            <span>Create First Profile</span>
          </Link>
        </div>
      ) : (
        /* ── Table Card ─────────────────────────────────────────────── */
        <div className="bg-white dark:bg-[#0f1626] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">

              {/* Gradient header strip */}
              <thead>
                <tr className="bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-500">
                  {['Tutor', 'Subject', 'Hours & Days', 'Rate', 'Slots', 'Actions'].map((col, i) => (
                    <th
                      key={col}
                      className={`px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white/90 ${
                        i === 5 ? 'text-right' : ''
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {tutors.map((tutor) => (
                  <tr
                    key={tutor._id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    {/* Tutor name + image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="h-11 w-11 rounded-lg object-cover object-top bg-slate-100 dark:bg-slate-800 flex-shrink-0 ring-2 ring-slate-100 dark:ring-slate-800"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{tutor.name}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{tutor.institution}</p>
                        </div>
                      </div>
                    </td>

                    {/* Subject pill */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400">
                        {tutor.subject}
                      </span>
                    </td>

                    {/* Time & Days */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{tutor.availableTime}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tutor.availableDays.join(', ')}</p>
                    </td>

                    {/* Rate */}
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800 dark:text-slate-100">
                      ${tutor.hourlyFee}
                      <span className="text-[10px] font-normal text-slate-400">/hr</span>
                    </td>

                    {/* Slots */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          tutor.totalSlots > 0
                            ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400'
                            : 'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400'
                        }`}
                      >
                        {tutor.totalSlots} Slots
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(tutor)}
                          title="Edit Listing"
                          className="text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/20 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Edit size={13} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tutor._id)}
                          title="Delete Listing"
                          className="text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Edit Modal ───────────────────────────────────────────────── */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
          <div className="bg-white dark:bg-[#0f1626] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 max-w-2xl w-full animate-scaleUp relative my-auto max-h-[90vh] overflow-y-auto">

            {/* Close button */}
            <button
              onClick={() => {
                setEditModalOpen(false);
                setCurrentTutor(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <XCircle size={24} />
            </button>

            {/* Modal heading */}
            <div className="mb-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900 mb-3">
                <Edit size={11} />
                Edit Listing
              </span>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
                Update Tutor Listing
              </h2>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className={LABEL_CLS}>Tutor Name *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><User size={16} /></span>
                    <input type="text" name="name" value={formData.name} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label className={LABEL_CLS}>Photo URL *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Image size={16} /></span>
                    <input type="url" name="image" value={formData.image} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={LABEL_CLS}>Subject Category *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><BookOpen size={16} /></span>
                    <select name="subject" value={formData.subject} onChange={handleEditChange} required className={INPUT_CLS}>
                      {SUBJECTS.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hourly Fee */}
                <div>
                  <label className={LABEL_CLS}>Hourly Fee (USD) *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><DollarSign size={16} /></span>
                    <input type="number" name="hourlyFee" min="0" value={formData.hourlyFee} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Available Time */}
                <div>
                  <label className={LABEL_CLS}>Available Time Slot *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Clock size={16} /></span>
                    <input type="text" name="availableTime" value={formData.availableTime} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Total Slots */}
                <div>
                  <label className={LABEL_CLS}>Total Slot Limit *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Layers size={16} /></span>
                    <input type="number" name="totalSlots" min="0" value={formData.totalSlots} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Session Start Date */}
                <div>
                  <label className={LABEL_CLS}>Session Start Date *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Calendar size={16} /></span>
                    <input type="date" name="sessionStartDate" value={formData.sessionStartDate} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Teaching Mode */}
                <div>
                  <label className={LABEL_CLS}>Teaching Mode *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><HelpCircle size={16} /></span>
                    <select name="teachingMode" value={formData.teachingMode} onChange={handleEditChange} required className={INPUT_CLS}>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className={LABEL_CLS}>Institution *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Award size={16} /></span>
                    <input type="text" name="institution" value={formData.institution} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className={LABEL_CLS}>Experience *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><Award size={16} /></span>
                    <input type="text" name="experience" value={formData.experience} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Location — full width */}
                <div className="md:col-span-2">
                  <label className={LABEL_CLS}>Location *</label>
                  <div className="relative">
                    <span className={ICON_WRAP}><MapPin size={16} /></span>
                    <input type="text" name="location" value={formData.location} onChange={handleEditChange} required className={INPUT_CLS} />
                  </div>
                </div>

                {/* Available Days — full width */}
                <div className="md:col-span-2">
                  <label className={LABEL_CLS}>
                    Available Days *{' '}
                    <span className="normal-case font-normal tracking-normal text-slate-400">(select at least one)</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5 mt-1">
                    {DAYS.map((day) => {
                      const isChecked = formData.availableDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleEditDayChange(day)}
                          className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                            isChecked
                              ? 'bg-gradient-to-r from-primary-500 to-teal-400 text-white border-transparent shadow-md'
                              : 'border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-300 dark:hover:border-primary-700 bg-transparent'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Modal action buttons */}
              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setCurrentTutor(null);
                  }}
                  className="py-2.5 px-5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updateLoading}
                  className="py-3 px-8 font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                >
                  {updateLoading ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Save Changes</span>
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

export default MyTutors;
