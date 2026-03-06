import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, XCircle, Clock, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    category: 'Electrician',
    description: '',
    price: '',
    location: ''
  });
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/bookings/mybookings', config);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings', error);
        setLoading(false);
      }
    };
    if (userInfo) fetchBookings();
  }, [userInfo]);

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/bookings/${id}`, { status }, config);
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const addServiceHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('/api/services', newService, config);
      alert('Service added successfully!');
      setShowAddForm(false);
      setNewService({ serviceName: '', category: 'Electrician', description: '', price: '', location: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add service');
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading dashboard...</div>;

  return (
    <div className="container animate-fade" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem' }}>User Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Welcome back, <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{userInfo.name}</span></p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {userInfo.role === 'provider' && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="btn btn-primary" 
              style={{ padding: '1rem 2rem', fontSize: '1rem' }}
            >
              <PlusCircle size={24} /> {showAddForm ? 'Close Form' : 'List New Service'}
            </button>
          )}
          <div style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '15px', 
            border: '1px solid var(--glass-border)',
            fontWeight: '900',
            letterSpacing: '1px',
            color: 'var(--secondary)'
          }}>
            {userInfo.role.toUpperCase()}
          </div>
        </div>
      </div>

      {showAddForm && (
        <section className="card animate-fade" style={{ marginBottom: '4rem', borderLeft: '6px solid var(--primary)' }}>
          <h2 style={{ marginBottom: '2.5rem', fontSize: '2rem', fontWeight: '900' }}>Grow Your Business</h2>
          <form onSubmit={addServiceHandler}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Marketing Name</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g. Master Choice Plumbing"
                  value={newService.serviceName}
                  onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Specialization</label>
                <select 
                  className="glass-input" 
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  required
                >
                  <option value="Electrician">Expert Electrician</option>
                  <option value="Plumber">Licensed Plumber</option>
                  <option value="Tutor">Private Tutor</option>
                  <option value="Repair">Repair Technician</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Base Price (₹)</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Service Area</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  value={newService.location}
                  onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Service Highlights</label>
              <textarea 
                className="glass-input" 
                style={{ minHeight: '120px' }} 
                placeholder="What makes your service great?"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem' }}>
              Launch Pro Listing
            </button>
          </form>
        </section>
      )}

      <section className="card" style={{ padding: '3rem' }}>
        <h2 style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '2.2rem', fontWeight: '900' }}>
          <Calendar size={36} color="var(--primary)" /> 
          {userInfo.role === 'provider' ? 'Active Appointments' : 'My Requests'}
        </h2>

        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem' }}>No activity records found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {bookings.map((booking, index) => (
              <div key={booking._id} className="animate-fade" style={{ 
                animationDelay: `${index * 100}ms`,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '2rem', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                flexWrap: 'wrap',
                gap: '2rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                      {userInfo.role === 'provider' ? booking.userId.name : (booking.serviceId?.serviceName || 'Service')}
                    </h4>
                    <span style={{ 
                      padding: '0.4rem 1rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: '900',
                      background: booking.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : booking.status === 'accepted' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: booking.status === 'pending' ? '#facc15' : booking.status === 'accepted' ? '#4ade80' : '#f87171'
                    }}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>
                    Scheduled for: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', borderLeft: '4px solid var(--primary)' }}>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Requirement Detail:</strong>
                    <p style={{ marginTop: '0.4rem', fontSize: '0.95rem' }}>{booking.purpose}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.2rem' }}>
                  {userInfo.role === 'provider' && booking.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateStatus(booking._id, 'accepted')} 
                        className="btn" 
                        style={{ background: '#22c55e', color: 'white', padding: '0.8rem 2rem' }}
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => updateStatus(booking._id, 'rejected')} 
                        className="btn" 
                        style={{ background: '#ef4444', color: 'white', padding: '0.8rem 2rem' }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {booking.status !== 'pending' && (
                    <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {booking.status === 'accepted' ? <CheckCircle color="#4ade80" /> : <XCircle color="#f87171" />}
                      <span style={{ fontWeight: '700' }}>Request Logged</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
