import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, User, Image, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = 'Register - MediQueue';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoUrl, password } = formData;

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Password criteria validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }

    setLoading(true);
    try {
      // Create User
      const userCredential = await createUser(email, password);
      // Update Profile Details
      await updateUserProfile(name, photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
      
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Welcome to MediQueue. Please log in with your credentials.',
        icon: 'success',
        confirmButtonText: 'Proceed to Login',
        confirmButtonColor: '#4F46E5',
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      Swal.fire({
        title: 'Welcome Back!',
        text: 'Successfully logged in with Google.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Authentication Failed',
        text: err.message.replace('Firebase: ', ''),
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f1626] transition-all duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
            Create an Account
          </h2>
          <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
            Join MediQueue and connect with elite tutors today
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 mb-6 rounded-lg text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Full Name
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
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-850 focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-850 focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Photo URL (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Image size={18} />
              </span>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-850 focus:border-transparent dark:text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/50 dark:border-slate-850 focus:border-transparent dark:text-white"
              />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-tight">
              Must contain at least 6 characters, including 1 uppercase and 1 lowercase letter.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 font-semibold text-white rounded-lg bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 shadow-md hover:shadow-lg hover:shadow-primary-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 text-slate-500 bg-white dark:bg-[#0f1626] uppercase">Or Sign Up With</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 4.787c1.782 0 3.385.603 4.646 1.8l3.491-3.491C18.04 1.18 15.228 0 12 0 7.375 0 3.371 2.617 1.341 6.451l4.053 3.146C6.353 6.711 8.949 4.787 12 4.787z"/>
            <path fill="#4285F4" d="M23.985 12.278c0-.84-.075-1.646-.215-2.433H12v4.606h6.719c-.29 1.488-1.11 2.748-2.352 3.58v2.981h3.811c2.23-2.053 3.513-5.077 3.513-8.734z"/>
            <path fill="#FBBC05" d="M6.353 14.403c-.244-.734-.383-1.523-.383-2.341s.139-1.607.383-2.341L2.301 6.575C1.611 7.95 1.22 9.531 1.22 11.202s.391 3.252 1.081 4.627l4.052-3.146z"/>
            <path fill="#34A853" d="M12 24c3.228 0 5.94-1.07 7.922-2.894l-3.812-2.981c-1.074.721-2.449 1.147-4.11 1.147-3.051 0-5.647-1.924-6.606-4.81l-4.053 3.147C3.371 21.383 7.375 24 12 24z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Login redirect link */}
        <p className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-primary-600 hover:text-primary-500 hover:underline transition-all"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
