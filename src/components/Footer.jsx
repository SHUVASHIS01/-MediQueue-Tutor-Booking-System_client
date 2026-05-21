import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin
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
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Custom SVG for X logo */}
              <a href="#" className="hover:text-primary-400 transition-colors flex items-center" aria-label="X (formerly Twitter)">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Github">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
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
