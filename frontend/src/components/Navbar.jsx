import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav style={{ 
      background: 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid var(--glass-border)', 
      padding: '1.2rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ServiceFinder
        </Link>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/services" className="nav-link">Find Services</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                <User size={18} color="#6366f1" />
                <span style={{ fontWeight: '500' }}>{user.name}</span>
              </div>
              <button onClick={logoutHandler} className="btn" style={{ color: '#ef4444' }}>
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
