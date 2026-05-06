import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Trophy, Flame, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { useFitness } from '../context/FitnessContext';

const GoalsPage = () => {
  const { goals, addGoal, updateGoalProgress } = useFitness();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    unit: 'kg',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(formData);
    setFormData({ title: '', target: '', unit: 'kg', deadline: '' });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Goals</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-accent-green text-background px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={18} /> New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.length === 0 ? (
          <div className="md:col-span-2 text-center py-20 text-gray-500">
            <Target size={48} className="mx-auto mb-4 opacity-20" />
            <p>You haven't set any fitness goals yet.</p>
          </div>
        ) : (
          goals.map((goal) => (
            <GlassCard key={goal.id} className="relative overflow-hidden group">
              {goal.achieved && (
                <div className="absolute top-0 right-0 p-4 text-accent-green">
                  <Trophy size={24} />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${goal.achieved ? 'bg-accent-green/20' : 'bg-white/5'}`}>
                  <Target size={24} className={goal.achieved ? 'text-accent-green' : 'text-gray-400'} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{goal.title}</h3>
                  <p className="text-xs text-gray-400">Target: {goal.target} {goal.unit}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-gray-400">Progress</span>
                  <span className={goal.achieved ? 'text-accent-green' : 'text-white'}>{goal.progress}%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    className={`h-full rounded-full ${goal.achieved ? 'bg-accent-green shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-accent-purple'}`}
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/5 border-2 border-background flex items-center justify-center">
                      <Flame size={12} className="text-orange-500" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-background flex items-center justify-center text-[10px] text-gray-400">
                    +4
                  </div>
                </div>

                {!goal.achieved && (
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="w-1/2 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                    value={goal.progress}
                    onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                  />
                )}
                
                {goal.achieved && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-accent-green font-bold text-sm"
                  >
                    <CheckCircle2 size={16} /> Completed
                  </motion.div>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>

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
                <h3 className="text-xl font-bold">Set a New Goal</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder="Goal Title (e.g. Lose Weight)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-green"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="number" 
                    placeholder="Target Value"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-green"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                  />
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-green appearance-none"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="steps">steps</option>
                    <option value="km">km</option>
                    <option value="days">days</option>
                  </select>
                </div>

                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-green"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-accent-green text-background font-bold text-lg mt-4"
                >
                  Create Goal
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalsPage;
