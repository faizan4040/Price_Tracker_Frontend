import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      
      {/* Outer Animated Ring */}
      <div className="relative">
        <div className="h-20 w-20 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>

        {/* Inner Pulse Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
      </div>

      <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;
