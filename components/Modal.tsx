
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl p-6 w-full ${sizeClasses[size]} transform transition-all`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
