import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Ruler, Scale, TrendingDown, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { useFitness } from '../context/FitnessContext';

const ProgressPage = () => {
  const { progress, addWeightLog, theme } = useFitness();
  const [newWeight, setNewWeight] = useState('');

  const handleAddWeight = (e) => {
    e.preventDefault();
    if (newWeight) {
      addWeightLog(newWeight);
      setNewWeight('');
    }
  };

  const chartData = progress.weight.length > 0 ? progress.weight : [
    { date: '2024-05-01', weight: 80 },
    { date: '2024-05-02', weight: 79.5 },
    { date: '2024-05-03', weight: 79.2 },
    { date: '2024-05-04', weight: 79.8 },
    { date: '2024-05-05', weight: 79.0 },
  ];

  const currentWeight = chartData[chartData.length - 1].weight;
  const startWeight = chartData[0].weight;
  const weightDiff = (currentWeight - startWeight).toFixed(1);

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold">Progress</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Input Card */}
        <GlassCard className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Scale className="text-accent-green" /> Log Weight
            </h3>
            <form onSubmit={handleAddWeight} className="space-y-4">
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1"
                  placeholder="0.0"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-2xl font-bold outline-none focus:border-accent-green pr-16"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">kg</span>
              </div>
              <button 
                type="submit"
                className="w-full py-4 rounded-2xl bg-accent-green text-background font-bold hover:shadow-lg hover:shadow-accent-green/20 transition-all"
              >
                Save Entry
              </button>
            </form>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Total Change</p>
              <p className={`text-xl font-bold ${weightDiff <= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                {weightDiff > 0 ? '+' : ''}{weightDiff} kg
              </p>
            </div>
            {weightDiff <= 0 ? <TrendingDown className="text-accent-green" /> : <TrendingUp className="text-red-400" />}
          </div>
        </GlassCard>

        {/* Weight Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="sticky top-[72px] z-10 py-2 bg-background/50 backdrop-blur-md mb-4 -mx-2 px-2 flex items-center justify-between">
            <h3 className="font-bold">Weight Over Time</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-green"></span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Live Tracking</span>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  hide 
                />
                <YAxis 
                  domain={['dataMin - 2', 'dataMax + 2']} 
                  hide
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', 
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Body Measurements Section */}
      <div className="space-y-4">
        <div className="sticky top-[72px] z-20 py-4 bg-background/80 backdrop-blur-md flex items-center justify-between border-b border-white/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Ruler className="text-accent-purple" /> Body Measurements
          </h3>
          <button className="flex items-center gap-2 text-sm text-accent-purple font-bold">
            <Plus size={16} /> Add Log
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Chest', value: '102', unit: 'cm' },
            { label: 'Waist', value: '84', unit: 'cm' },
            { label: 'Biceps', value: '38', unit: 'cm' },
            { label: 'Thighs', value: '56', unit: 'cm' },
          ].map((m, i) => (
            <GlassCard key={i} className="group cursor-pointer">
              <p className="text-xs text-gray-400 uppercase font-bold mb-1">{m.label}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold group-hover:text-accent-purple transition-colors">{m.value}</span>
                <span className="text-xs text-gray-500 font-bold">{m.unit}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
