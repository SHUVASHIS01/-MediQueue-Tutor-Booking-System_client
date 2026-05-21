import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import {
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  BookOpen,
  RotateCcw,
  Star,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* ── PAGE HEADER ── */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/30 px-4 py-1.5 rounded-full mb-4">
          Browse Educators
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
          Explore{' '}
          <span className="bg-gradient-to-r from-primary-500 via-teal-400 to-primary-400 bg-clip-text text-transparent">
            Available Tutors
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Find the perfect academic mentor and book your custom slots dynamically — with zero scheduling conflicts.
        </p>
      </div>

      {/* ── SEARCH & FILTER PANEL ── */}
      <div className="bg-white dark:bg-[#0f1626] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 mb-10 transition-colors duration-300">
        {/* Panel label */}
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={15} className="text-primary-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Filter & Search
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">

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
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 dark:bg-slate-900/60 dark:text-white placeholder:text-slate-400 transition-all"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search size={16} />
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
                  className="w-full px-3 py-2.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 dark:bg-slate-900/60 dark:text-white transition-all"
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
                  className="w-full px-3 py-2.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-50 dark:bg-slate-900/60 dark:text-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="col-span-1 lg:col-span-2 flex space-x-2 w-full">
            <button
              onClick={handleFilterSubmit}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-xl hover:from-primary-500 hover:to-teal-400 shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
              title="Reset Search"
            >
              <RotateCcw size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* ── TUTOR CARDS GRID ── */}
      {loading ? (
        <Spinner />
      ) : tutors.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#0f1626] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-5">
            <BookOpen className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Tutors Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Try adjusting your search filters, checking the dates, or resetting the inputs.
          </p>
          <button
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <RotateCcw size={13} />
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Result count */}
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
            {tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="group bg-white dark:bg-[#0f1626] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image area */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400';
                    }}
                  />

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Subject badge — top right */}
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-primary-600/90 backdrop-blur-sm rounded-full border border-primary-400/30">
                    {tutor.subject}
                  </span>

                  {/* Slots badge — top left */}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-sm border ${
                      tutor.totalSlots > 0
                        ? 'text-teal-300 bg-teal-950/70 border-teal-700/40'
                        : 'text-red-300 bg-red-950/70 border-red-700/40'
                    }`}
                  >
                    {tutor.totalSlots > 0 ? `${tutor.totalSlots} slots left` : 'Full'}
                  </span>

                  {/* Teaching mode chip — bottom left */}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                    {tutor.teachingMode} Mode
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Name + star rating */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {tutor.institution} · {tutor.experience}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-3 mt-0.5">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">4.9</span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={13} className="text-primary-500 flex-shrink-0" />
                        <span className="truncate">
                          {tutor.availableDays.join(', ')} · {tutor.availableTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar size={13} className="text-primary-500 flex-shrink-0" />
                        <span>
                          Starts:{' '}
                          {new Date(tutor.sessionStartDate).toLocaleDateString(undefined, {
                            dateStyle: 'medium',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin size={13} className="text-primary-500 flex-shrink-0" />
                        <span className="truncate">{tutor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Hourly Rate
                      </span>
                      <span className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center">
                        <DollarSign size={15} className="-mr-0.5" />
                        {tutor.hourlyFee}
                        <span className="text-xs font-normal text-slate-400 ml-1">/hr</span>
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/tutors/${tutor._id}`)}
                      className="flex-1 py-2.5 px-4 font-bold text-center text-white text-sm bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Tutors;
