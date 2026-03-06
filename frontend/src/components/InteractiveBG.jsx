import React, { useEffect, useState } from 'react';

const InteractiveBG = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 30 randomized particles
    const p = [...Array(30)].map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      type: i % 3 === 0 ? 'particle-primary' : i % 3 === 1 ? 'particle-secondary' : 'particle-accent',
      speed: Math.random() * 0.1 + 0.05
    }));
    setParticles(p);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-container">
      {particles.map((p) => (
        <div 
          key={p.id}
          className={`particle ${p.type}`} 
          style={{ 
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(${(mousePos.x - p.x) * p.speed}px, ${(mousePos.y - p.y) * p.speed}px)` 
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBG;
