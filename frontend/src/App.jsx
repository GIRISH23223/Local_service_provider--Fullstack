import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InteractiveBG from './components/InteractiveBG';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <InteractiveBG />
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        &copy; 2026 Local Services Finder. All rights reserved.
      </footer>
    </Router>
  );
}

export default App;
