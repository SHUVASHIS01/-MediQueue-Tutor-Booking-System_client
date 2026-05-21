import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axiosSecure from '../api/axiosSecure';
import {
  User,
  Image,
  BookOpen,
  Clock,
  DollarSign,
  Layers,
  Calendar,
  Award,
  MapPin,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
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

const AddTutor = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    subject: SUBJECTS[0],
    availableDays: [],
    availableTime: '',
    hourlyFee: '',
    totalSlots: '',
    sessionStartDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: 'Online',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Add Tutor - MediQueue';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDayChange = (day) => {
    const updatedDays = [...formData.availableDays];
    if (updatedDays.includes(day)) {
      updatedDays.splice(updatedDays.indexOf(day), 1);
    } else {
      updatedDays.push(day);
    }
    setFormData({ ...formData, availableDays: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      image,
      subject,
      availableDays,
      availableTime,
      hourlyFee,
      totalSlots,
      sessionStartDate,
      institution,
      experience,
      location,
      teachingMode,
    } = formData;

    if (availableDays.length === 0) {
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

    setLoading(true);

    const payload = {
      name,
      image,
      subject,
      availableDays,
      availableTime,
      hourlyFee: Number(hourlyFee),
      totalSlots: Number(totalSlots),
      sessionStartDate,
      institution,
      experience,
      location,
      teachingMode,
      createdBy: user.email,
    };

    try {
      await axiosSecure.post('/api/tutors', payload);
      Swal.fire({
        title: 'Tutor Created!',
        text: 'The tutor profile has been successfully saved to the database.',
        icon: 'success',
        confirmButtonText: 'View My Tutors',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
      navigate('/my-tutors');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Submission Error',
        text: error.response?.data?.message || 'Something went wrong. Please check your data.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* ── Premium Page Header ─────────────────────────────────────── */}
      <div className="text-center mb-10">
        {/* Badge pill */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900 mb-4">
          <Sparkles size={12} />
          Tutor Management
        </span>

        {/* Gradient headline */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent leading-tight">
          List a New Tutor
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Publish an available tutor slot and allow students to schedule learning sessions with ease.
        </p>
      </div>

      {/* ── Form Card ──────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#0f1626] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Tutor Name */}
            <div>
              <label className={LABEL_CLS}>Tutor Name *</label>
              <div className="relative">
                <span className={ICON_WRAP}><User size={17} /></span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Shuvashis Basak"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className={LABEL_CLS}>Photo URL *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Image size={17} /></span>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://postimg.cc/image-link"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className={LABEL_CLS}>Subject Category *</label>
              <div className="relative">
                <span className={ICON_WRAP}><BookOpen size={17} /></span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS}
                >
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
                <span className={ICON_WRAP}><DollarSign size={17} /></span>
                <input
                  type="number"
                  name="hourlyFee"
                  min="0"
                  value={formData.hourlyFee}
                  onChange={handleChange}
                  required
                  placeholder="45"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Available Time */}
            <div>
              <label className={LABEL_CLS}>Available Time Slot *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Clock size={17} /></span>
                <input
                  type="text"
                  name="availableTime"
                  value={formData.availableTime}
                  onChange={handleChange}
                  required
                  placeholder="5:00 PM - 8:00 PM"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Total Slots */}
            <div>
              <label className={LABEL_CLS}>Total Slot Limit *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Layers size={17} /></span>
                <input
                  type="number"
                  name="totalSlots"
                  min="1"
                  value={formData.totalSlots}
                  onChange={handleChange}
                  required
                  placeholder="10"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Session Start Date */}
            <div>
              <label className={LABEL_CLS}>Session Start Date *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Calendar size={17} /></span>
                <input
                  type="date"
                  name="sessionStartDate"
                  value={formData.sessionStartDate}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className={LABEL_CLS}>Teaching Mode *</label>
              <div className="relative">
                <span className={ICON_WRAP}><PlusCircle size={17} /></span>
                <select
                  name="teachingMode"
                  value={formData.teachingMode}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            {/* Institution */}
            <div>
              <label className={LABEL_CLS}>Institution Name *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Award size={17} /></span>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder="Harvard University"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className={LABEL_CLS}>Experience Details *</label>
              <div className="relative">
                <span className={ICON_WRAP}><Award size={17} /></span>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="5 Years (Senior Lecturer)"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Location — full width */}
            <div className="md:col-span-2">
              <label className={LABEL_CLS}>Location (Area / City) *</label>
              <div className="relative">
                <span className={ICON_WRAP}><MapPin size={17} /></span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Boston, Massachusetts"
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Available Days — full width */}
            <div className="md:col-span-2">
              <label className={LABEL_CLS}>
                Available Days * <span className="normal-case font-normal tracking-normal text-slate-400">(select at least one)</span>
              </label>
              <div className="flex flex-wrap gap-2.5 mt-1">
                {DAYS.map((day) => {
                  const isChecked = formData.availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayChange(day)}
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

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-8 font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle size={18} />
                  <span>Submit Listing</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTutor;
