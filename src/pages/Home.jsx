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
  MapPin, 
  DollarSign,
  Star,
  Zap,
  Shield,
  BookOpen
} from 'lucide-react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    badge: '🎓 Trusted by 15,000+ Students',
    title: 'Unlock Your Full',
    titleGradient: 'Academic Potential',
    subtitle: 'Connect with verified top-tier tutors for one-on-one personalized learning sessions tailored exactly to your goals.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    badge: '⚡ Zero Scheduling Conflicts',
    title: 'Eliminate',
    titleGradient: 'Overlapping Schedules',
    subtitle: 'Reserve available hours dynamically with automatic conflict prevention tokens and real-time slot management.'
  },
  {
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    badge: '🔬 1,200+ Expert Mentors',
    title: 'Expert Mentors in',
    titleGradient: 'Every Field',
    subtitle: 'From Advanced Calculus and Quantum Mechanics to Language, Software Coding and beyond.'
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
    q: 'How do I list myself as a tutor?',
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
    <div className="pb-24">

      {/* ── 1. HERO BANNER ── */}
      <div className="relative h-[600px] w-full overflow-hidden bg-slate-950">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 z-10" />
            <img src={slide.image} alt="Learning banner" className="w-full h-full object-cover scale-105" />

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold text-slate-300 tracking-wider">
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-4xl">
                {slide.title}{' '}
                <span className="bg-gradient-to-r from-primary-400 via-teal-300 to-primary-400 bg-clip-text text-transparent">
                  {slide.titleGradient}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mb-8 leading-relaxed">
                {slide.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/tutors"
                  className="inline-flex items-center gap-2 py-3 px-8 font-bold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-1 transition-all duration-200"
                >
                  <span>Find Available Tutors</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 py-3 px-7 font-semibold text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary-400 w-8' : 'bg-white/30 w-3'
              }`}
            />
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-[#070b13] to-transparent z-20" />
      </div>

      {/* ── 2. FEATURED TUTORS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900/40 px-4 py-1.5 rounded-full mb-3">
              Featured Educators
            </span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">
              Top-Rated{' '}
              <span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">
                Mentors
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              Hand-picked educators available for immediate slot registration
            </p>
          </div>
          <Link
            to="/tutors"
            className="flex-shrink-0 inline-flex items-center gap-2 py-2.5 px-5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-800"
          >
            View All Tutors
            <ArrowRight size={15} />
          </Link>
        </div>

        {tutorsLoading ? (
          <Spinner />
        ) : featuredTutors.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0f1626] rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No tutor listings yet. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="group bg-white dark:bg-[#0f1626] rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Subject badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-primary-600/90 backdrop-blur-sm rounded-full border border-primary-400/30">
                    {tutor.subject}
                  </span>
                  {/* Slots badge */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full backdrop-blur-sm border ${
                    tutor.totalSlots > 0
                      ? 'text-teal-300 bg-teal-950/70 border-teal-700/40'
                      : 'text-red-300 bg-red-950/70 border-red-700/40'
                  }`}>
                    {tutor.totalSlots > 0 ? `${tutor.totalSlots} slots left` : 'Full'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate">{tutor.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{tutor.institution} · {tutor.experience}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">4.9</span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={13} className="text-primary-500 flex-shrink-0" />
                        <span className="truncate">{tutor.availableDays.join(', ')} · {tutor.availableTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin size={13} className="text-primary-500 flex-shrink-0" />
                        <span className="truncate">{tutor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hourly Rate</span>
                      <span className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center">
                        <DollarSign size={15} className="-mr-0.5" />{tutor.hourlyFee}
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
        )}
      </div>

      {/* ── 3. STATS SECTION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/30 border border-teal-800/40 px-4 py-1.5 rounded-full mb-4">
            Why MediQueue
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            Built for{' '}
            <span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">
              Serious Learners
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            A platform that eliminates friction — from finding the right tutor to locking in your session with a single click.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Active Students', value: '15,000+', startColor: '#818cf8', endColor: '#38bdf8', border: 'border-indigo-800/30', bg: 'bg-indigo-950/30', glow: 'hover:shadow-indigo-500/20' },
            { icon: Clock, label: 'Tuition Hours', value: '450K+', startColor: '#2dd4bf', endColor: '#6ee7b7', border: 'border-teal-800/30', bg: 'bg-teal-950/30', glow: 'hover:shadow-teal-500/20' },
            { icon: Award, label: 'Satisfaction Rate', value: '99.2%', startColor: '#a78bfa', endColor: '#c4b5fd', border: 'border-violet-800/30', bg: 'bg-violet-950/30', glow: 'hover:shadow-violet-500/20' },
            { icon: TrendingUp, label: 'Elite Tutors', value: '1,200+', startColor: '#fb923c', endColor: '#fbbf24', border: 'border-orange-800/30', bg: 'bg-orange-950/30', glow: 'hover:shadow-orange-500/20' },
          ].map(({ icon: Icon, label, value, startColor, endColor, border, bg, glow }, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-7 bg-slate-900 dark:bg-[#0a0f1e] border ${border} shadow-xl hover:shadow-2xl ${glow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-2xl group-hover:opacity-35 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle, ${startColor}, ${endColor})` }}
              />
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id={`stat-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                  </linearGradient>
                </defs>
              </svg>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} border ${border} mb-5`}>
                <Icon className="h-6 w-6" style={{ stroke: `url(#stat-grad-${i})` }} />
              </div>
              <p className="text-4xl font-extrabold text-white mb-1">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: 'Zero Scheduling Conflicts', desc: 'Our slot engine auto-blocks overlapping session times so every booking is guaranteed clean.', color: 'text-primary-500 bg-primary-50 dark:bg-primary-950/30' },
            { icon: Zap, title: 'Instant Digital Tokens', desc: 'Each booking instantly generates a secure session token for verifiable classroom access.', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/30' },
            { icon: TrendingUp, title: 'Cancel & Recover Slots', desc: 'Cancel any session and the slot is immediately returned back to the tutor pool.', color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30' },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-[#0f1626] border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-900/60 hover:shadow-md transition-all duration-200 group">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. FAQ SECTION ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left Panel */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/30 px-4 py-1.5 rounded-full mb-5">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
              Got{' '}
              <span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">
                Questions?
              </span>
              <br />We Have Answers.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              Everything you need to know about bookings, slots, digital tokens and session management.
            </p>
            <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
            <Link
              to="/tutors"
              className="mt-8 inline-flex items-center gap-2 py-2.5 px-5 font-semibold text-sm text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse All Tutors
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-2 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-primary-300 dark:border-primary-800 shadow-lg shadow-primary-500/10 bg-primary-50/30 dark:bg-primary-950/10'
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f1626] hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-br from-primary-500 to-teal-400 text-white shadow-md shadow-primary-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className={`font-semibold text-sm leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {faq.q}
                      </span>
                    </div>
                    <span className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="ml-12 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-primary-300 dark:border-primary-800 pl-4">
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
