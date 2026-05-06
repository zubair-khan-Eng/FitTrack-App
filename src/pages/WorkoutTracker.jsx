import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Trash2, 
  Clock, 
  Dumbbell,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFitness } from '../context/FitnessContext';
import GlassCard from '../components/ui/GlassCard';
import FAB from '../components/ui/FAB';

const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Cardio'];

const WorkoutTracker = () => {
  const { workouts, addWorkout, deleteWorkout, toggleWorkout } = useFitness();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    muscleGroup: 'Chest',
    duration: '',
    sets: '',
    reps: ''
  });

  const filteredWorkouts = workouts.filter(w => 
    activeFilter === 'All' || w.muscleGroup === activeFilter
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(formData);
    setFormData({ name: '', muscleGroup: 'Chest', duration: '', sets: '', reps: '' });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workouts</h2>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-30 py-4 bg-background/80 backdrop-blur-md -mx-4 px-4 md:-mx-8 md:px-8 border-b border-white/5 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat 
                ? 'bg-accent-green text-background' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredWorkouts.map((workout) => (
            <motion.div
              key={workout.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard className={`relative group ${workout.completed ? 'border-accent-green/30 bg-accent-green/5' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-accent-green font-bold bg-accent-green/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                      {workout.muscleGroup}
                    </span>
                    <h3 className={`text-lg font-bold ${workout.completed ? 'text-gray-400 line-through' : ''}`}>
                      {workout.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => deleteWorkout(workout.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase">Sets</span>
                    <span className="font-bold text-white">{workout.sets}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase">Reps</span>
                    <span className="font-bold text-white">{workout.reps}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase">Time</span>
                    <span className="font-bold text-white">{workout.duration}m</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleWorkout(workout.id)}
                  className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                    workout.completed 
                    ? 'bg-accent-green/20 text-accent-green' 
                    : 'bg-accent-green text-background hover:shadow-lg hover:shadow-accent-green/20'
                  }`}
                >
                  {workout.completed ? (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} /> Completed
                    </motion.div>
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FAB to Open Form */}
      <FAB onClick={() => setIsFormOpen(true)} />

      {/* Add Workout Modal/Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass p-6 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Add New Workout</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1 uppercase font-bold">Workout Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Bench Press"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-green focus:ring-0 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1 uppercase font-bold">Category</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-green focus:ring-0 outline-none appearance-none"
                      value={formData.muscleGroup}
                      onChange={(e) => setFormData({...formData, muscleGroup: e.target.value})}
                    >
                      {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1 uppercase font-bold">Duration (min)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-green focus:ring-0 outline-none"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1 uppercase font-bold">Sets</label>
                    <input 
                      required
                      type="number" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-green focus:ring-0 outline-none"
                      value={formData.sets}
                      onChange={(e) => setFormData({...formData, sets: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1 uppercase font-bold">Reps</label>
                    <input 
                      required
                      type="number" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-green focus:ring-0 outline-none"
                      value={formData.reps}
                      onChange={(e) => setFormData({...formData, reps: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-accent-green text-background font-bold text-lg mt-4 hover:shadow-lg hover:shadow-accent-green/20 transition-all"
                >
                  Create Workout
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutTracker;
