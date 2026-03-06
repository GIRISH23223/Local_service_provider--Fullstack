import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    location: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    try {
      const { data } = await axios.post('/api/auth/register', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(formData.role === 'provider' ? '/dashboard' : '/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container animate-fade" style={{ maxWidth: '550px', marginTop: '4rem' }}>
      <div className="card">
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '2.5rem' }}>
          <button 
            type="button"
            onClick={() => setFormData({ ...formData, role: 'user' })} 
            style={{ flex: 1, padding: '1.2rem', fontWeight: '700', borderBottom: formData.role === 'user' ? '4px solid var(--primary)' : 'none', color: formData.role === 'user' ? 'var(--text)' : 'var(--text-muted)' }}
          >
            I'm a Customer
          </button>
          <button 
            type="button"
            onClick={() => setFormData({ ...formData, role: 'provider' })} 
            style={{ flex: 1, padding: '1.2rem', fontWeight: '700', borderBottom: formData.role === 'provider' ? '4px solid var(--secondary)' : 'none', color: formData.role === 'provider' ? 'var(--text)' : 'var(--text-muted)' }}
          >
            I'm a Provider
          </button>
        </div>

        <h2 style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '2rem', fontWeight: '800' }}>
          {formData.role === 'user' ? 'Join Our Community' : 'Start Your Business'}
        </h2>
        <form onSubmit={submitHandler}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Full Name</label>
              <input 
                name="name"
                type="text" 
                className="glass-input" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email</label>
              <input 
                name="email"
                type="email" 
                className="glass-input" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Password</label>
              <input 
                name="password"
                type="password" 
                className="glass-input" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Location</label>
              <input 
                name="location"
                type="text" 
                className="glass-input" 
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem', marginTop: '1.5rem' }}>
            Create My Portfolio Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
