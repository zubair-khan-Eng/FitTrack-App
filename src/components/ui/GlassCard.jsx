import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const GlassCard = ({ children, className }) => {
  return (
    <div className={cn(
      "glass glass-hover p-6 rounded-2xl",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;
