import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Mail,
  Lock,
  AlertCircle,
  GraduationCap,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
} from 'lucide-react';
import Swal from 'sweetalert2';

/* ─────────────────────────────────────────────
   Left-panel trust bullets
───────────────────────────────────────────── */
const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Tutors',
    desc: 'Every educator is background-checked and credential-verified.',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    desc: 'Reserve sessions in seconds with real-time availability.',
  },
  {
    icon: Users,
    title: '10 000+ Students',
    desc: 'Join a thriving community accelerating their learning.',
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.title = 'Login – MediQueue';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      Swal.fire({
        title: 'Welcome Back!',
        text: 'Login successful.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
      navigate(from, { replace: true });
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
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
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
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      });
    } finally {
      setLoading(false);
    }
  };

  /* ── shared input class ── */
  const inputCls =
    'w-full pl-11 pr-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-200';

  return (
    <div className="min-h-screen flex items-stretch bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">

      {/* ══════════════════════════════════════
          LEFT PANEL — dark gradient branding
      ══════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 to-[#0a0f1e] px-12 py-14">

        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-600 opacity-20 blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-teal-500 opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-indigo-700 opacity-10 blur-3xl" />
        </div>

        {/* Brand logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-400 shadow-lg shadow-primary-500/30">
              <GraduationCap className="text-white" size={26} />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Medi<span className="bg-gradient-to-r from-primary-400 to-teal-300 bg-clip-text text-transparent">Queue</span>
            </span>
          </div>

          {/* Badge pill */}
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-primary-950/40 border border-primary-800/50 px-4 py-1.5 rounded-full mb-6">
            Tutor Booking Platform
          </span>

          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            Learn from the<br />
            <span className="bg-gradient-to-r from-primary-400 to-teal-300 bg-clip-text text-transparent">
              best minds.
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Connect with expert tutors, schedule sessions, and accelerate your academic journey — all in one place.
          </p>
        </div>

        {/* Trust bullets */}
        <div className="relative z-10 space-y-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Icon className="text-teal-400" size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{title}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom footnote */}
        <p className="relative z-10 text-slate-600 text-xs">
          © {new Date().getFullYear()} MediQueue. All rights reserved.
        </p>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — form
      ══════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-14 sm:px-10 lg:px-16 xl:px-20">
        <div className="w-full max-w-md">

          {/* Mobile logo (visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-400">
              <GraduationCap className="text-white" size={22} />
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              Medi<span className="bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent">Queue</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/30 px-4 py-1.5 rounded-full mb-4">
              Welcome Back
            </span>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-500 to-teal-400 bg-clip-text text-transparent mb-2">
              Account Login
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to access sessions, bookings, and tutors.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="flex items-center gap-2.5 p-4 mb-6 rounded-xl text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <Mail size={17} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    Swal.fire({
                      title: 'Forgot Password?',
                      text: 'Email recovery is currently deactivated for testing convenience. Please contact support.',
                      icon: 'info',
                      confirmButtonColor: '#4F46E5',
                      background: theme === 'dark' ? '#1e293b' : '#ffffff',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    })
                  }
                  className="text-xs text-primary-600 hover:text-primary-500 hover:underline focus:outline-none transition-colors"
                >
                  Forget Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <Lock size={17} />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 shadow-lg shadow-primary-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 text-slate-400 bg-slate-50 dark:bg-[#070b13] uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 4.787c1.782 0 3.385.603 4.646 1.8l3.491-3.491C18.04 1.18 15.228 0 12 0 7.375 0 3.371 2.617 1.341 6.451l4.053 3.146C6.353 6.711 8.949 4.787 12 4.787z" />
              <path fill="#4285F4" d="M23.985 12.278c0-.84-.075-1.646-.215-2.433H12v4.606h6.719c-.29 1.488-1.11 2.748-2.352 3.58v2.981h3.811c2.23-2.053 3.513-5.077 3.513-8.734z" />
              <path fill="#FBBC05" d="M6.353 14.403c-.244-.734-.383-1.523-.383-2.341s.139-1.607.383-2.341L2.301 6.575C1.611 7.95 1.22 9.531 1.22 11.202s.391 3.252 1.081 4.627l4.052-3.146z" />
              <path fill="#34A853" d="M12 24c3.228 0 5.94-1.07 7.922-2.894l-3.812-2.981c-1.074.721-2.449 1.147-4.11 1.147-3.051 0-5.647-1.924-6.606-4.81l-4.053 3.147C3.371 21.383 7.375 24 12 24z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Register redirect */}
          <p className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-primary-600 hover:text-primary-500 hover:underline transition-all"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
