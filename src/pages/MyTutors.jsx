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
  FileText,
  User,
  Image,
  BookOpen,
  DollarSign,
  Clock,
  Calendar,
  Award,
  MapPin,
  HelpCircle
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
  'Coding'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MyTutors = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(null);
  
  // Edit Form State
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
    teachingMode: ''
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
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/tutors/${id}`);
          setTutors(prev => prev.filter(t => t._id !== id));
          
          Swal.fire({
            title: 'Deleted!',
            text: 'Your tutor listing has been deleted.',
            icon: 'success',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the tutor.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
          });
        }
      }
    });
  };

  const openEditModal = (tutor) => {
    setCurrentTutor(tutor);
    
    // Format sessionStartDate to YYYY-MM-DD
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
      teachingMode: tutor.teachingMode
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
      const index = updatedDays.indexOf(day);
      updatedDays.splice(index, 1);
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
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      return;
    }

    setUpdateLoading(true);

    const payload = {
      ...formData,
      hourlyFee: Number(formData.hourlyFee),
      totalSlots: Number(formData.totalSlots),
      createdBy: user.email // safety
    };

    try {
      const { data } = await axiosSecure.put(`/api/tutors/${currentTutor._id}`, payload);
      
      // Update local state immediately
      setTutors(prev => prev.map(t => t._id === currentTutor._id ? data : t));
      
      setEditModalOpen(false);
      setCurrentTutor(null);

      Swal.fire({
        title: 'Tutor Updated!',
        text: 'Tutor profile details have been successfully saved.',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Update Failed',
        text: error.response?.data?.message || 'Something went wrong.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            My Created Tutors
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal tutor list details, view slots, edit scheduling, or delete listings.
          </p>
        </div>
        
        <Link
          to="/add-tutor"
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-teal-500 text-white rounded-lg shadow-md font-semibold hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-200 text-sm"
        >
          <Plus size={16} />
          <span>Add New Tutor</span>
        </Link>
      </div>

      {/* Empty State */}
      {tutors.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0f1626] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <Layers className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-650 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Tutors Listed</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            You haven't listed any tutor profiles yet. Let's create one now to make slots available for students!
          </p>
          <Link
            to="/add-tutor"
            className="inline-flex items-center space-x-2 mt-6 px-5 py-2.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md transition-all"
          >
            <Plus size={14} />
            <span>Create First Profile</span>
          </Link>
        </div>
      ) : (
        /* Table Layout */
        <div className="bg-white dark:bg-[#0f1626] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-150 dark:divide-slate-800 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Tutor</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Subject</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Hours & Days</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Rate</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Available Slots</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-sm">
                {tutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img 
                          className="h-10 w-10 rounded-lg object-cover bg-slate-100" 
                          src={tutor.image} 
                          alt={tutor.name} 
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-150">{tutor.name}</p>
                          <p className="text-[10px] text-slate-450 truncate max-w-[150px]">{tutor.institution}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400">
                        {tutor.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-350">
                      <p className="font-semibold">{tutor.availableTime}</p>
                      <p className="text-[10px] text-slate-450">{tutor.availableDays.join(', ')}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800 dark:text-slate-200">
                      ${tutor.hourlyFee}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold ${tutor.totalSlots > 0 ? 'text-teal-500' : 'text-red-500'}`}>
                        {tutor.totalSlots} Slots
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => openEditModal(tutor)}
                        className="inline-flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-primary-50 dark:hover:bg-primary-950/20 text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
                        title="Edit Listing"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(tutor._id)}
                        className="inline-flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Tutor Modal Form */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-[#0f1626] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 animate-scaleUp relative my-auto max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setEditModalOpen(false);
                setCurrentTutor(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-slate-355 transition-colors"
            >
              <XCircle size={24} />
            </button>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent mb-6">
              Update Tutor Listing
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tutor Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Tutor Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleEditChange}
                      required
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
                      <Image size={16} />
                    </span>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleEditChange}
                      required
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
                      <BookOpen size={16} />
                    </span>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleEditChange}
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
                      <DollarSign size={16} />
                    </span>
                    <input
                      type="number"
                      name="hourlyFee"
                      min="0"
                      value={formData.hourlyFee}
                      onChange={handleEditChange}
                      required
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
                      <Clock size={16} />
                    </span>
                    <input
                      type="text"
                      name="availableTime"
                      value={formData.availableTime}
                      onChange={handleEditChange}
                      required
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
                      <Layers size={16} />
                    </span>
                    <input
                      type="number"
                      name="totalSlots"
                      min="0"
                      value={formData.totalSlots}
                      onChange={handleEditChange}
                      required
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
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      name="sessionStartDate"
                      value={formData.sessionStartDate}
                      onChange={handleEditChange}
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
                      <HelpCircle size={16} />
                    </span>
                    <select
                      name="teachingMode"
                      value={formData.teachingMode}
                      onChange={handleEditChange}
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
                    Institution *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Award size={16} />
                    </span>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleEditChange}
                      required
                      className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Experience *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Award size={16} />
                    </span>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleEditChange}
                      required
                      className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <MapPin size={16} />
                    </span>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleEditChange}
                      required
                      className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                    />
                  </div>
                </div>

                {/* Available Days */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Available Days * (Select at least one)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => {
                      const isChecked = formData.availableDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleEditDayChange(day)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                            isChecked 
                              ? 'bg-primary-550 border-primary-550 text-white shadow-sm' 
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

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setCurrentTutor(null);
                  }}
                  className="py-2 px-4 border border-slate-250 dark:border-slate-700 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="py-2 px-6 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-lg shadow-lg hover:shadow-primary-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                >
                  {updateLoading ? (
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
