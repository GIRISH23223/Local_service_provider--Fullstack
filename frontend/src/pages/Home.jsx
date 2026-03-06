import React, { useState } from 'react';
import { Search, Zap, Droplet, BookOpen, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (query.trim()) {
        navigate(`/services?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const categories = [
    { name: 'Electrician', icon: <Zap size={40} color="#6366f1" />, color: 'rgba(99, 102, 241, 0.1)' },
    { name: 'Plumber', icon: <Droplet size={40} color="#06b6d4" />, color: 'rgba(6, 182, 212, 0.1)' },
    { name: 'Tutor', icon: <BookOpen size={40} color="#ec4899" />, color: 'rgba(236, 72, 153, 0.1)' },
    { name: 'Repair', icon: <Settings size={40} color="#8b5cf6" />, color: 'rgba(139, 92, 246, 0.1)' },
  ];

  return (
    <div className="container">
      <header style={{ textAlign: 'center', padding: '6rem 0' }} className="animate-fade">
        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.025em', lineHeight: '1.1' }}>
          Find the Perfect <br />
          <span style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Service Provider
          </span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Trusted professionals at your doorstep. Fast, reliable, and just a tap away.
        </p>
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="What service do you need today?" 
            className="glass-input"
            style={{ paddingLeft: '3.5rem', fontSize: '1.2rem', height: '64px', borderRadius: '32px' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Search 
            style={{ 
              position: 'absolute', 
              left: '1.5rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--primary)',
              cursor: 'pointer' 
            }} 
            size={28}
            onClick={handleSearch}
          />
        </div>
      </header>

      <section style={{ padding: '4rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}>Explore Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              to={`/services?category=${cat.name}`} 
              className="card animate-fade" 
              style={{ textAlign: 'center', animationDelay: `${index * 100}ms`, borderBottom: `4px solid ${cat.icon.props.color}` }}
            >
              <div style={{ 
                background: cat.color, 
                width: '90px', 
                height: '90px', 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                animation: 'float 4s ease-in-out infinite'
              }}>
                {cat.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{cat.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>Top Rated Professionals</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
