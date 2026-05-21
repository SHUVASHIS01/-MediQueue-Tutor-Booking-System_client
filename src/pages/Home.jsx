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

      {/* 3. Platform Statistics (Extra Section 1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 dark:from-[#0f1626] dark:to-[#090e1a] rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 text-white transition-colors duration-300">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/40 px-3 py-1 rounded-full">
              Why Choose MediQueue
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Streamlining Tutor Connections
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Our dynamic booking engine eliminates schedule overlap, ensuring simple slot management for students and tutors alike.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <Users className="h-10 w-10 text-primary-400 mb-3" />
              <span className="text-3xl font-extrabold text-white">15,000+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Active Students</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Clock className="h-10 w-10 text-teal-400 mb-3" />
              <span className="text-3xl font-extrabold text-white">450,000+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Tuition Hours</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Award className="h-10 w-10 text-primary-400 mb-3" />
              <span className="text-3xl font-extrabold text-white">99.2%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Satisfaction Rate</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <TrendingUp className="h-10 w-10 text-teal-400 mb-3" />
              <span className="text-3xl font-extrabold text-white">1,200+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Elite Tutors</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FAQs Collapsible Section (Extra Section 2) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mt-3">
            Got Questions? We Have Answers
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Learn more about schedules, bookings, cancellation rules, and digital learning tokens.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0f1626] rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-primary-500" /> : <ChevronDown size={18} />}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-900/30 animate-slideDown">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Home;
