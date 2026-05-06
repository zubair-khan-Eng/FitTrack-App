import React from 'react';
import { Bell, User, Search, Sun, Moon } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const Navbar = () => {
  const { theme, toggleTheme } = useFitness();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <nav className="sticky-nav px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-foreground">FitTrack</h1>
        <p className="text-xs text-gray-400">{greeting}, User!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-card border border-card-border rounded-full px-4 py-1.5 focus-within:border-accent-green transition-colors">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 text-foreground placeholder-gray-500"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-gray-300" /> : <Moon size={20} className="text-gray-600" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-green rounded-full"></span>
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-green to-accent-purple p-[2px]">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
            <User size={20} className="text-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
