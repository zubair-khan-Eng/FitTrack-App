import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { Utensils, Flame, Plus, Coffee, Moon, Sun, Apple, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { useFitness } from '../context/FitnessContext';

const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const NutritionTracker = () => {
  const { meals, addMeal, theme } = useFitness();
  const [activeTab, setActiveTab] = useState('Breakfast');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    category: 'Breakfast'
  });

  const macroData = [
    { name: 'Protein', value: meals.reduce((acc, m) => acc + (parseFloat(m.protein) || 0), 0), color: '#22c55e' },
    { name: 'Carbs', value: meals.reduce((acc, m) => acc + (parseFloat(m.carbs) || 0), 0), color: '#a855f7' },
    { name: 'Fat', value: meals.reduce((acc, m) => acc + (parseFloat(m.fat) || 0), 0), color: '#f59e0b' },
  ];

  const totalCalories = meals.reduce((acc, m) => acc + (parseFloat(m.calories) || 0), 0);
  const calorieGoal = 2500;
  const caloriePercent = Math.min((totalCalories / calorieGoal) * 100, 100);

  const filteredMeals = meals.filter(m => m.category === activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal(formData);
    setFormData({ name: '', calories: '', protein: '', carbs: '', fat: '', category: activeTab });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Nutrition</h2>

      {/* Daily Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <Flame className="text-orange-500" /> Daily Calories
            </h3>
            <span className="text-sm font-medium text-gray-400">{totalCalories} / {calorieGoal} kcal</span>
          </div>
          
          <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${caloriePercent}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center mt-6">
            {macroData.map((m, i) => (
              <div key={i}>
                <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">{m.name}</p>
                <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}g</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center">
          <h3 className="font-bold self-start mb-2">Macro Distribution</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', 
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Sticky Category Tabs */}
      <div className="sticky top-[72px] z-30 py-4 bg-background/80 backdrop-blur-md -mx-4 px-4 md:-mx-8 md:px-8 border-b border-white/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 bg-card p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {mealCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === cat 
                  ? 'bg-background text-foreground shadow-lg' 
                  : 'text-gray-400 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="p-3 bg-accent-purple text-white rounded-xl hover:scale-105 transition-transform shrink-0"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Meal List */}
      <div className="space-y-4">
        {filteredMeals.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic">
            No meals logged for {activeTab} yet.
          </div>
        ) : (
          filteredMeals.map((meal, i) => (
            <GlassCard key={i} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <Apple size={20} className="text-accent-green" />
                </div>
                <div>
                  <h4 className="font-bold">{meal.name}</h4>
                  <p className="text-xs text-gray-400">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent-green">{meal.calories} kcal</p>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      {/* Add Meal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass p-6 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Log {activeTab}</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder="Meal Name (e.g. Oatmeal)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-purple"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="number" 
                    placeholder="Calories"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-purple"
                    value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  />
                  <input 
                    required
                    type="number" 
                    placeholder="Protein (g)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-purple"
                    value={formData.protein}
                    onChange={(e) => setFormData({...formData, protein: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="number" 
                    placeholder="Carbs (g)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-purple"
                    value={formData.carbs}
                    onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                  />
                  <input 
                    required
                    type="number" 
                    placeholder="Fat (g)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-purple"
                    value={formData.fat}
                    onChange={(e) => setFormData({...formData, fat: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-accent-purple text-white font-bold text-lg mt-4"
                >
                  Log Meal
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionTracker;
