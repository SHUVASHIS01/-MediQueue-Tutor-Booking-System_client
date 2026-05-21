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
  PlusCircle 
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
  'Coding'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    teachingMode: 'Online'
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
      const index = updatedDays.indexOf(day);
      updatedDays.splice(index, 1);
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
      teachingMode 
    } = formData;

    if (availableDays.length === 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please select at least one available day.',
        icon: 'warning',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
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
      createdBy: user.email
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
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
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
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-[#0f1626] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 transition-all duration-300">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
            List a New Tutor
          </h1>
          <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
            Publish an available tutor slot and allow students to schedule learning tokens
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tutor Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Tutor Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Shuvashis Basak"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Photo Link */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Photo URL *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Image size={18} />
                </span>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://postimg.cc/image-link"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Subject Category *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <BookOpen size={18} />
                </span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                >
                  {SUBJECTS.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hourly Fee */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Hourly Fee (USD) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <DollarSign size={18} />
                </span>
                <input
                  type="number"
                  name="hourlyFee"
                  min="0"
                  value={formData.hourlyFee}
                  onChange={handleChange}
                  required
                  placeholder="45"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Available Time Slot */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Available Time Slot *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Clock size={18} />
                </span>
                <input
                  type="text"
                  name="availableTime"
                  value={formData.availableTime}
                  onChange={handleChange}
                  required
                  placeholder="5:00 PM - 8:00 PM"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Total Slots */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Total Slot Limit *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Layers size={18} />
                </span>
                <input
                  type="number"
                  name="totalSlots"
                  min="1"
                  value={formData.totalSlots}
                  onChange={handleChange}
                  required
                  placeholder="10"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Session Start Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Session Start Date *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Calendar size={18} />
                </span>
                <input
                  type="date"
                  name="sessionStartDate"
                  value={formData.sessionStartDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Teaching Mode *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <PlusCircle size={18} />
                </span>
                <select
                  name="teachingMode"
                  value={formData.teachingMode}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Institution Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Award size={18} />
                </span>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder="Harvard University"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Experience Details *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Award size={18} />
                </span>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="5 Years (Senior Lecturer)"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Location (Area/City) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <MapPin size={18} />
                </span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Boston, Massachusetts"
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>

            {/* Available Days */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Available Days * (Select at least one)
              </label>
              <div className="flex flex-wrap gap-3">
                {DAYS.map((day) => {
                  const isChecked = formData.availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayChange(day)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                        isChecked 
                          ? 'bg-primary-500 border-primary-500 text-white shadow-md shadow-primary-500/10' 
                          : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 px-6 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-lg shadow-lg hover:shadow-primary-500/20 focus:outline-none transition-all duration-250 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
