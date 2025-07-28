import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode; // ✅ Tambahkan children
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full relative shadow-lg">
        <button className="absolute top-2 right-3 text-black" onClick={onClose}>✖</button>

        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        {description && <p className="text-gray-700 mb-4">{description}</p>}

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
