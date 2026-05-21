import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosSecure from '../api/axiosSecure';
import Spinner from '../components/Spinner';
import { 
  ArrowRight, 
  Users, 
  Clock, 
  Award, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  DollarSign,
  GraduationCap
} from 'lucide-react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    title: 'Unlock Your Full Academic Potential',
    subtitle: 'Connect with verified top-tier tutors for one-on-one personalized learning.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    title: 'Eliminate Overlapping Schedules',
    subtitle: 'Reserve available hours dynamically with automatic conflict prevention tokens.'
  },
  {
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    title: 'Expert Mentors in Every Field',
    subtitle: 'From Advanced Calculus and Quantum Mechanics to Language and Software Coding.'
  }
];

const FAQS = [
  {
    q: 'How does the booking slot system prevent conflicts?',
    a: 'Each tutor has a defined set of total available slots. When a session is booked, the slot count decrements. When a slot is cancelled, it auto-replenishes. The system blocks booking when slots hit 0.'
  },
  {
    q: 'Can I reschedule my tutor booking sessions?',
    a: 'You can cancel any active booking from your My Booked Sessions dashboard. Once cancelled, your slot is released back to the tutor, allowing you to select a different date or schedule.'
  },
  {
    q: 'What is the digital session token?',
    a: 'Upon successful reservation, the system generates a secure booking record which serves as your digital session token to join the scheduled classes.'
  },
  {
    q: 'How do I listing myself as a tutor?',
    a: 'Once logged in, navigate to the Add Tutor tab, fill in your details (fees, schedule days, institution, start date), and submit. You can manage your listings in the My Tutors tab.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredTutors, setFeaturedTutors] = useState([]);
  const [tutorsLoading, setTutorsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home - MediQueue';
    fetchFeaturedTutors();

    // Auto-slide carousel interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchFeaturedTutors = async () => {
    try {
      const { data } = await axiosSecure.get('/api/tutors/featured');
      setFeaturedTutors(data);
    } catch (error) {
      console.error('Error fetching featured tutors:', error);
    } finally {
      setTutorsLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Carousel Slider Banner */}
      <div className="relative h-[500px] w-full overflow-hidden bg-slate-900">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background image overlay */}
            <div className="absolute inset-0 bg-slate-950/70 z-10"></div>
            <img
              src={slide.image}
              alt="Learning banner"
              className="w-full h-full object-cover transform scale-105"
            />
            
            {/* Banner Text Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl">
                {slide.subtitle}
              </p>
              <div className="pt-4">
                <Link
                  to="/tutors"
                  className="inline-flex items-center space-x-2 py-3 px-8 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-xl shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Find Available Tutors</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary-500 w-8' : 'bg-white/45'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* 2. Available Tutors Section (Featured 6) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
              Featured Educators
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top-rated mentors available for immediate slot registration
            </p>
          </div>
          <Link
            to="/tutors"
            className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <span>View All Tutors</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {tutorsLoading ? (
          <Spinner />
        ) : featuredTutors.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#0f1626] rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400">No tutor listings available currently. Create one to display featured tutors!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutors.map((tutor) => (
              <div 
                key={tutor._id} 
                className="bg-white dark:bg-[#0f1626] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover-card flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold text-white bg-primary-600/90 rounded-full backdrop-blur-sm">
                    {tutor.subject}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white truncate mb-1">
                      {tutor.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
                      {tutor.institution} &bull; {tutor.experience}
                    </p>

                    <div className="space-y-2 text-xs text-slate-650 dark:text-slate-350">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-primary-500" />
                        <span>{tutor.availableDays.join(', ')} ({tutor.availableTime})</span>
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
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block text-right">Slots Left</span>
                      <span className={`text-sm font-bold block text-right ${tutor.totalSlots > 0 ? 'text-teal-500' : 'text-red-500'}`}>
                        {tutor.totalSlots}
                      </span>
                    </div>
                  </div>
                </div>

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

      {/* 3. Platform Statistics (Extra Section 1) — Premium Redesign */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/30 border border-teal-800/40 px-4 py-1.5 rounded-full mb-4">
            Why Choose MediQueue
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            Built for{' '}
            <span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">
              Serious Learners
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
            A platform that eliminates friction — from finding the right tutor to locking in your session with a single click.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Active Students', value: '15,000+', color: 'from-primary-600 to-primary-400', glow: 'shadow-primary-500/20', bg: 'bg-primary-950/30', border: 'border-primary-800/30' },
            { icon: Clock, label: 'Tuition Hours', value: '450K+', color: 'from-teal-600 to-teal-400', glow: 'shadow-teal-500/20', bg: 'bg-teal-950/30', border: 'border-teal-800/30' },
            { icon: Award, label: 'Satisfaction Rate', value: '99.2%', color: 'from-violet-600 to-violet-400', glow: 'shadow-violet-500/20', bg: 'bg-violet-950/30', border: 'border-violet-800/30' },
            { icon: TrendingUp, label: 'Elite Tutors', value: '1,200+', color: 'from-rose-600 to-orange-400', glow: 'shadow-orange-500/20', bg: 'bg-orange-950/30', border: 'border-orange-800/30' },
          ].map(({ icon: Icon, label, value, color, glow, bg, border }, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-6 bg-slate-900 dark:bg-[#0a0f1e] border ${border} shadow-xl ${glow} hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              {/* Glow blob */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} border ${border} mb-5`}>
                <Icon className={`h-6 w-6 bg-gradient-to-br ${color} bg-clip-text`} style={{ color: 'transparent', stroke: 'url(#g' + i + ')' }} />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id={'g' + i} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={['#818cf8','#2dd4bf','#a78bfa','#fb923c'][i]} />
                      <stop offset="100%" stopColor={['#38bdf8','#6ee7b7','#c4b5fd','#fbbf24'][i]} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlights Strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Zero Scheduling Conflicts', desc: 'Our slot engine auto-blocks overlapping session times so every booking is clean.', emoji: '🔒' },
            { title: 'Instant Digital Tokens', desc: 'Each booking instantly generates a secure session token for verifiable access.', emoji: '⚡' },
            { title: 'Cancel & Recover Slots', desc: 'Cancel any session and the slot is immediately returned to the tutor pool.', emoji: '🔄' },
          ].map((feat, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0f1626] border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-200 shadow-sm hover:shadow-md">
              <span className="text-2xl mt-0.5">{feat.emoji}</span>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">{feat.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FAQs — Premium Redesign (Extra Section 2) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left sticky label */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/30 px-4 py-1.5 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
              Got{' '}
              <span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">Questions?</span>
              <br />We Have Answers.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              Everything you need to know about bookings, slots, digital tokens and session management.
            </p>
            <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
          </div>

          {/* Right FAQ accordion */}
          <div className="lg:col-span-2 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-primary-300 dark:border-primary-800 shadow-lg shadow-primary-500/10'
                      : 'border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-700'
                  } bg-white dark:bg-[#0f1626]`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-br from-primary-500 to-teal-400 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className={`font-semibold text-sm transition-colors duration-200 ${
                        isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {faq.q}
                      </span>
                    </div>
                    <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5">
                      <div className="ml-11 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-primary-200 dark:border-primary-900 pl-4">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
