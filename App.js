import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Tasks from './components/Tasks';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
