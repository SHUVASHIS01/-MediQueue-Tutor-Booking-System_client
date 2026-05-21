import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  Github
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-[#05070d] border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <GraduationCap className="h-8 w-8 text-primary-400" />
              <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">
                MediQueue
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              Simplifying learning connection. Eliminate booking overlaps, manage days and times, and unlock elite academic mentorship in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              {/* Custom SVG for X logo */}
              <a href="#" className="hover:text-primary-400 transition-colors flex items-center" aria-label="X (formerly Twitter)">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Github">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Learning Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/tutors?search=Mathematics" className="hover:text-primary-400 transition-colors">Mathematics Tuition</Link>
              </li>
              <li>
                <Link to="/tutors?search=Physics" className="hover:text-primary-400 transition-colors">Physics & Science</Link>
              </li>
              <li>
                <Link to="/tutors?search=Coding" className="hover:text-primary-400 transition-colors">Computer Programming</Link>
              </li>
              <li>
                <Link to="/tutors?search=English" className="hover:text-primary-400 transition-colors">Languages & English</Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-primary-400 transition-colors">Browse All Tutors</Link>
              </li>
            </ul>
          </div>

          {/* Platform Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Features</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Digital Session Tokens</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Interactive Calendars</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Instant Slot Reservation</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Secure Profile Portfolios</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary-400 transition-colors">Join as a Student</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-400 shrink-0" />
                <span className="truncate">support@mediqueue.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-primary-400 shrink-0 mt-0.5" />
                <span>100 Academic Way, Suite 400, Boston, MA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} MediQueue. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
