import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FitnessProvider } from './context/FitnessContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import WorkoutTracker from './pages/WorkoutTracker';
import NutritionTracker from './pages/NutritionTracker';
import ProgressPage from './pages/ProgressPage';
import GoalsPage from './pages/GoalsPage';

function App() {
  return (
    <FitnessProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<WorkoutTracker />} />
            <Route path="/nutrition" element={<NutritionTracker />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/goals" element={<GoalsPage />} />
          </Routes>
        </Layout>
      </Router>
    </FitnessProvider>
  );
}

export default App;
