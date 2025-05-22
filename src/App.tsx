import React from 'react';
import { Counter } from './components/Counter';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <h1>React Redux TypeScript Example</h1>
      <Counter />
    </div>
  );
}

export default App;
