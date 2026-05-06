import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  Target 
} from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: LayoutDashboard, path: '/' },
    { icon: Dumbbell, path: '/workouts' },
    { icon: Utensils, path: '/nutrition' },
    { icon: LineChart, path: '/progress' },
    { icon: Target, path: '/goals' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass border-t border-white/10 px-6 flex items-center justify-between z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            p-2 rounded-xl transition-all duration-200
            ${isActive 
              ? 'text-accent-green bg-accent-green/10 scale-110' 
              : 'text-gray-400'}
          `}
        >
          <item.icon size={24} />
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
