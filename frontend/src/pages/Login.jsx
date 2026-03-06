import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to customer
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      
      // Check if the role matches
      if (data.role !== role) {
        alert(`This is the ${role === 'user' ? 'Customer' : 'Provider'} login. Your account is registered as a ${data.role}.`);
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(data.role === 'provider' ? '/dashboard' : '/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container animate-fade" style={{ maxWidth: '480px', marginTop: '6rem' }}>
      <div className="card">
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '2.5rem' }}>
          <button 
            onClick={() => setRole('user')} 
            style={{ flex: 1, padding: '1.2rem', fontWeight: '700', borderBottom: role === 'user' ? '4px solid var(--primary)' : 'none', color: role === 'user' ? 'var(--text)' : 'var(--text-muted)' }}
          >
            Customer
          </button>
          <button 
            onClick={() => setRole('provider')} 
            style={{ flex: 1, padding: '1.2rem', fontWeight: '700', borderBottom: role === 'provider' ? '4px solid var(--secondary)' : 'none', color: role === 'provider' ? 'var(--text)' : 'var(--text-muted)' }}
          >
            Provider
          </button>
        </div>

        <h2 style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '2rem', fontWeight: '800' }}>
          {role === 'user' ? 'Welcome Back' : 'Provider Access'}
        </h2>
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email Address</label>
            <input 
              type="email" 
              className="glass-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              className="glass-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}>
            Sign In to Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
