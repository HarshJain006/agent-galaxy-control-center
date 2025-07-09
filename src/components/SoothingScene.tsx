import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
  direction: number;
}

export function SoothingScene() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 25;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 3,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        hue: Math.random() * 60 + 180, // Blue to cyan range
        direction: Math.random() * Math.PI * 2,
      });
    }
    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed * 0.1) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed * 0.05) % 100,
        direction: particle.direction + 0.01,
      })));
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-96 w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      {/* Animated gradient background layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-cyan-200/40"
        style={{
          animation: 'gentle-pulse 6s ease-in-out infinite alternate'
        }}
      ></div>
      
      {/* Flowing wave layers */}
      <div className="absolute inset-0">
        <div 
          className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-300/30 to-transparent"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 80% 70%, 60% 50%, 40% 60%, 20% 40%, 0 50%)',
            animation: 'wave-flow 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-300/25 to-transparent"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 70%, 85% 80%, 70% 60%, 50% 70%, 30% 50%, 0 60%)',
            animation: 'wave-flow-2 10s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      {/* Floating and moving particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-300 ease-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `hsla(${particle.hue}, 60%, 70%, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px hsla(${particle.hue}, 60%, 70%, 0.4)`,
            filter: 'blur(1px)',
            transform: `scale(${1 + Math.sin(particle.direction) * 0.3})`,
          }}
        />
      ))}

      {/* Central flowing orb */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,223,0,0.15) 0%, rgba(0,204,255,0.1) 50%, transparent 100%)',
          animation: 'gentle-breathe 4s ease-in-out infinite alternate'
        }}
      ></div>

      {/* Gentle sparkles with smooth movement */}
      <div 
        className="absolute w-3 h-3 bg-yellow-300/70 rounded-full"
        style={{
          animation: 'sparkle-float 12s ease-in-out infinite',
          top: '15%',
          left: '20%'
        }}
      ></div>
      <div 
        className="absolute w-2 h-2 bg-blue-300/70 rounded-full"
        style={{
          animation: 'sparkle-float-2 14s ease-in-out infinite',
          top: '25%',
          right: '15%'
        }}
      ></div>
      <div 
        className="absolute w-2.5 h-2.5 bg-purple-300/70 rounded-full"
        style={{
          animation: 'sparkle-float-3 16s ease-in-out infinite',
          bottom: '20%',
          left: '25%'
        }}
      ></div>
      <div 
        className="absolute w-1.5 h-1.5 bg-cyan-300/70 rounded-full"
        style={{
          animation: 'sparkle-float-4 18s ease-in-out infinite',
          bottom: '30%',
          right: '20%'
        }}
      ></div>

    </div>
  );
}