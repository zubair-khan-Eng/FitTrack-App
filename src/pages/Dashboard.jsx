import React from 'react';
import { 
  Flame, 
  Footprints, 
  Droplets, 
  Dumbbell,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import { useFitness } from '../context/FitnessContext';

const data = [
  { day: 'Mon', calories: 2100 },
  { day: 'Tue', calories: 1800 },
  { day: 'Wed', calories: 2400 },
  { day: 'Thu', calories: 1600 },
  { day: 'Fri', calories: 2200 },
  { day: 'Sat', calories: 2800 },
  { day: 'Sun', calories: 2000 },
];

const Dashboard = () => {
  const { theme } = useFitness();
  const date = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const stats = [
    { label: 'Calories', value: '2,450', unit: 'kcal', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Steps', value: '8,240', unit: 'steps', icon: Footprints, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Water', value: '1.5', unit: 'liters', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Workouts', value: '4', unit: 'this week', icon: Dumbbell, color: 'text-accent-green', bg: 'bg-accent-green/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Sticky Section Header */}
      <div className="sticky top-[72px] z-30 py-2 bg-background/80 backdrop-blur-md -mx-4 px-4 md:-mx-8 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.unit}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Weekly Progress & Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[350px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="text-accent-green" size={20} />
              Weekly Progress
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', 
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                  }}
                />
                <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#22c55e' : '#22c55e40'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award size={100} />
          </div>
          
          <div className="p-4 rounded-full bg-accent-purple/10 text-accent-purple">
            <Award size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold italic">"Consistency is the key to all progress."</h3>
            <p className="text-gray-400 text-sm">— FitTrack Motivation</p>
          </div>

          <button className="px-6 py-2 rounded-full bg-accent-purple text-white font-medium hover:bg-accent-purple/90 transition-colors">
            Share Progress
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
