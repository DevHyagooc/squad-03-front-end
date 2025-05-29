import React from 'react';

const Loading = () => {
   return (
      <div className=" inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/40 backdrop-blur-sm">
         <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full opacity-25"></div>
            <div className="absolute inset-0 border-4 border-t-gray-800 rounded-full animate-spin"></div>
         </div>
      </div>
   );
};

export default Loading;
