import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - MediQueue';
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      <div className="relative mb-6">
        <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-tr from-primary-500 to-teal-500 rounded-full"></div>
        <GraduationCap className="h-24 w-24 mx-auto text-primary-500 dark:text-primary-400 relative" />
      </div>
      <h1 className="text-9xl font-extrabold text-slate-800 dark:text-slate-100 tracking-widest bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-2xl font-semibold md:text-3xl mt-4 text-slate-700 dark:text-slate-300">
        Page Not Found
      </p>
      <p className="max-w-md mt-4 text-slate-500 dark:text-slate-400">
        Sorry, the page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track!
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center space-x-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 rounded-lg shadow-lg hover:shadow-primary-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <ArrowLeft size={18} />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
