import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-500/10 border-t-primary-500 animate-spin"></div>
        {/* Inner reverse spinning ring */}
        <div className="absolute inset-2 rounded-full border-4 border-teal-500/10 border-b-teal-500 animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
        {/* Center pulse dot */}
        <div className="absolute inset-[18px] rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Spinner;
