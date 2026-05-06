import React from 'react';
import { Plus } from 'lucide-react';

const FAB = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-accent-green text-background rounded-full shadow-lg shadow-accent-green/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
    >
      <Plus size={28} strokeWidth={3} />
    </button>
  );
};

export default FAB;
