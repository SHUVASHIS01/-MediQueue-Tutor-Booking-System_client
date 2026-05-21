import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  GraduationCap, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut, 
  User, 
  BookOpen, 
  PlusCircle, 
  Layers
} from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tutors', path: '/tutors' }
  ];

  const privateLinks = [
    { name: 'Add Tutor', path: '/add-tutor', icon: <PlusCircle size={16} /> },
    { name: 'My Tutors', path: '/my-tutors', icon: <Layers size={16} /> },
    { name: 'My Booked Sessions', path: '/my-bookings', icon: <BookOpen size={16} /> }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <GraduationCap className="h-8 w-8 animate-pulse" />
              <span className="font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
                MediQueue
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary-500 ${
                    isActive ? 'nav-active' : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user && privateLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary-500 ${
                    isActive ? 'nav-active' : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              /* User logged in */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-primary-500 hover:ring-teal-400 transition-all duration-200"
                    src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                    alt={user.displayName || 'User profile'}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-2 text-slate-800 dark:text-slate-200 divide-y divide-slate-100 dark:divide-slate-700">
                    <div className="px-4 py-2">
                      <p className="text-sm font-semibold truncate">{user.displayName || 'Welcome'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          Swal.fire({
                            title: 'Profile Settings',
                            html: `<div class="text-left"><p><strong>Name:</strong> ${user.displayName || 'N/A'}</p><p><strong>Email:</strong> ${user.email}</p></div>`,
                            icon: 'info',
                            background: theme === 'dark' ? '#1e293b' : '#ffffff',
                            color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                          });
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </button>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* User not logged in */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-100 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user && privateLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          {user ? (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-500"
                  src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt={user.displayName || 'User profile'}
                />
                <div>
                  <p className="text-sm font-semibold">{user.displayName || 'Welcome'}</p>
                  <p className="text-xs text-slate-500 truncate w-40">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 rounded-lg shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
