import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingPurpose, setBookingPurpose] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: serviceData } = await axios.get(`/api/services/${id}`);
        setService(serviceData);
        const { data: reviewData } = await axios.get(`/api/reviews/${serviceData.providerId._id}`);
        setReviews(reviewData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const bookHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to book a service');
      navigate('/login');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('/api/bookings', {
        providerId: service.providerId._id,
        serviceId: service._id,
        date: bookingDate,
        purpose: bookingPurpose
      }, config);
      alert('Booking request sent successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading profile...</div>;
  if (!service) return <div className="container">Service not found</div>;

  return (
    <div className="container animate-fade" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(350px, 1fr)', gap: '3rem', alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '24px' }}>
                <Star size={64} color="var(--primary)" fill="var(--primary)" />
              </div>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>{service.providerId.name}</h1>
                <p style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.4rem', marginBottom: '0.75rem' }}>{service.serviceName}</p>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={18} /> {service.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={18} fill="#fbbf24" color="#fbbf24" /> 4.9 Rating
                  </div>
                </div>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.2rem' }}>Professional Description</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>{service.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Starting Price</p>
                <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>₹{service.price}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Availability</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800' }}>24/7 Service</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Response Time</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '800' }}>&lt; 30 mins</p>
              </div>
            </div>
          </div>

          <section className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to book!</p> : (
              reviews.map(review => (
                <div key={review._id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '800' }}>{review.userId.name}</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{review.comment}</p>
                </div>
              ))
            )}
          </section>
        </div>

        <div style={{ position: 'sticky', top: '120px' }}>
          <div className="card" style={{ border: '2px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>Reservation Form</h3>
            <form onSubmit={bookHandler}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Choose Date</label>
                <input 
                  type="date" 
                  className="glass-input" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Explain Your Need</label>
                <textarea 
                  className="glass-input" 
                  style={{ minHeight: '120px' }} 
                  placeholder="e.g., I have a leak in my bathroom..."
                  value={bookingPurpose}
                  onChange={(e) => setBookingPurpose(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}>
                Confirm Booking Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
