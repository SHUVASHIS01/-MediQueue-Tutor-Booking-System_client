import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import { Search, Calendar, MapPin, DollarSign, Clock, BookOpen, RotateCcw } from 'lucide-react';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Available Tutors - MediQueue';
    fetchTutors();
  }, []);

  const fetchTutors = async (searchVal = '', startVal = '', endVal = '') => {
    setLoading(true);
    try {
      let queryParams = [];
      if (searchVal) queryParams.push(`search=${encodeURIComponent(searchVal)}`);
      if (startVal) queryParams.push(`startDate=${startVal}`);
      if (endVal) queryParams.push(`endDate=${endVal}`);
      
      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const { data } = await axiosSecure.get(`/api/tutors${queryString}`);
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTutors(search, startDate, endDate);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchTutors(search, startDate, endDate);
  };

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    fetchTutors('', '', '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
          Explore Available Tutors
        </h1>
        <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
          Find the perfect academic mentor and book your custom slots dynamically
        </p>
      </div>

      {/* Search and Filter Panel */}
      <div className="bg-white dark:bg-[#0f1626] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8 transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="col-span-1 lg:col-span-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Search by Tutor Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search tutors..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={18} />
              </span>
            </div>
          </form>

          {/* Date range filter */}
          <div className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Session Start (Min)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Session Start (Max)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-800 focus:border-transparent dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="col-span-1 lg:col-span-2 flex space-x-2 w-full">
            <button
              onClick={handleFilterSubmit}
              className="flex-1 py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-lg hover:from-primary-700 hover:to-teal-600 transition-all duration-200"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Reset Search"
            >
              <RotateCcw size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Tutor Cards Grid */}
      {loading ? (
        <Spinner />
      ) : tutors.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0f1626] rounded-2xl border border-dashed border-slate-200 dark:border-slate-850 p-8">
          <BookOpen className="h-12 w-12 mx-auto text-slate-350 dark:text-slate-600 mb-4 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Tutors Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters, checking the dates, or resetting the inputs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div 
              key={tutor._id} 
              className="bg-white dark:bg-[#0f1626] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover-card flex flex-col justify-between"
            >
              {/* Image & Subject Header */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-850">
                <img 
                  src={tutor.image} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-white bg-primary-600/90 rounded-full backdrop-blur-md">
                  {tutor.subject}
                </span>
                
                {/* teaching mode overlay */}
                <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[10px] font-semibold text-slate-800 bg-white/90 rounded-md shadow-sm">
                  {tutor.teachingMode} Mode
                </span>
              </div>

              {/* Tutor Body Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-150 truncate mb-1">
                    {tutor.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
                    {tutor.institution} &bull; {tutor.experience}
                  </p>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-primary-500" />
                      <span>{tutor.availableDays.join(', ')} ({tutor.availableTime})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-primary-500" />
                      <span>Starts: {new Date(tutor.sessionStartDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-primary-500" />
                      <span className="truncate">{tutor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hourly Fee</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center">
                      <DollarSign size={16} className="-mr-0.5" />
                      {tutor.hourlyFee}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block text-right">Available Slots</span>
                    <span className={`text-sm font-bold block text-right ${tutor.totalSlots > 0 ? 'text-teal-500' : 'text-red-500'}`}>
                      {tutor.totalSlots > 0 ? `${tutor.totalSlots} Slots` : 'Full'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => navigate(`/tutors/${tutor._id}`)}
                  className="w-full py-2.5 px-4 font-semibold text-center text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-xl shadow-md transition-all duration-200"
                >
                  Book Session
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Tutors;
