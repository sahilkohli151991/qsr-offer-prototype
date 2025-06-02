
import React from 'react';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullPage, size = 'md', message }) => {
  const spinnerSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  const spinnerMarkup = (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 bg-slate-500 bg-opacity-50 z-50' : ''}`}>
      <div className={`animate-spin rounded-full ${spinnerSizeClasses[size]} border-t-4 border-b-4 border-indigo-600`}></div>
      {message && <p className="mt-4 text-lg text-slate-700 font-semibold">{message}</p>}
    </div>
  );

  return spinnerMarkup;
};

export default LoadingSpinner;
