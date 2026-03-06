import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('/api/services');
        if (categoryParam) {
          setServices(data.filter(s => s.category === categoryParam));
        } else {
          setServices(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services', error);
        setLoading(false);
      }
    };
    fetchServices();
  }, [categoryParam]);

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading services...</div>;

  return (
    <div className="container animate-fade">
      <div style={{ padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
          {categoryParam ? `${categoryParam} Specialists` : 'All Services'}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Top-rated professionals ready to help you
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {services.length === 0 ? (
            <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No services match your search.</p>
              <Link to="/services" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Clear Filters</Link>
            </div>
          ) : (
            services.map((service, index) => (
              <div key={service._id} className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', animationDelay: `${index * 100}ms` }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <span style={{ 
                      background: 'rgba(99, 102, 241, 0.2)', 
                      color: 'var(--primary)', 
                      padding: '0.4rem 1rem', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: '800' 
                    }}>
                      {service.category}
                    </span>
                    <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--secondary)' }}>₹{service.price}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{service.serviceName}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                    {service.description.substring(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--text)' }}>
                    <MapPin size={18} color="var(--primary)" />
                    <span style={{ fontWeight: '500' }}>{service.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fbbf24' }}>
                    <Star size={18} fill="#fbbf24" />
                    <span style={{ fontWeight: '800' }}>4.8</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(24 reviews)</span>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Link to={`/services/${service._id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    View Profile & Book
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
