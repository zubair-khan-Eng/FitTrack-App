import React, { createContext, useContext, useState, useEffect } from 'react';

const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : { weight: [], measurements: [] };
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, id: Date.now(), completed: false }]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  const addMeal = (meal) => {
    setMeals([...meals, { ...meal, id: Date.now(), date: new Date().toISOString() }]);
  };

  const addWeightLog = (weight) => {
    const newLog = { date: new Date().toISOString().split('T')[0], weight: parseFloat(weight) };
    setProgress(prev => ({
      ...prev,
      weight: [...prev.weight, newLog]
    }));
  };

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now(), progress: 0, achieved: false }]);
  };

  const updateGoalProgress = (id, progressValue) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress: progressValue, achieved: progressValue >= 100 } : g));
  };

  return (
    <FitnessContext.Provider value={{
      workouts, addWorkout, deleteWorkout, toggleWorkout,
      meals, addMeal,
      progress, addWeightLog,
      goals, addGoal, updateGoalProgress,
      theme, toggleTheme
    }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => useContext(FitnessContext);
