import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="text-center space-y-6">
        {/* Animated logo/icon with pulse effect */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600 dark:text-purple-400 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <span className="flex items-center justify-center">
            Loading
            <span className="flex ml-1 space-x-1">
              {[0, 1, 2].map((dot) => (
                <span 
                  key={dot}
                  className="opacity-0"
                  style={{
                    animation: `fadeInOut 1.5s infinite ${dot * 0.3}s`
                  }}
                >
                  .
                </span>
              ))}
            </span>
          </span>
        </div>

        {/* Animated progress bar */}
        <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            style={{
              width: '100%',
              animation: 'progressBar 2s linear infinite',
              transformOrigin: 'left center'
            }}
          ></div>
        </div>

        {/* Subtle animated background pattern */}
        <div 
          className="fixed inset-0 -z-10 opacity-5 dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ccc 1px, transparent 1px),
              linear-gradient(to bottom, #ccc 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            animation: 'backgroundMove 20s linear infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;