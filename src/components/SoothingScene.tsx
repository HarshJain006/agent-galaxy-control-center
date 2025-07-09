import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
}

export function SoothingScene() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() * 60 + 180, // Blue to cyan range
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="h-96 w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-cyan-200/30 animate-pulse"></div>
      
      {/* Gentle wave animation */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-200/40 to-transparent opacity-60">
        <div 
            className="w-full h-full bg-gradient-to-r from-blue-300/30 via-cyan-300/30 to-blue-300/30 animate-pulse"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 80% 70%, 60% 50%, 40% 60%, 20% 40%, 0 50%)'
            }}
          ></div>
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `hsla(${particle.hue}, 60%, 70%, ${particle.opacity})`,
            animation: `bounce ${15 + particle.speed * 10}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.5}s`
          }}
        />
      ))}

      {/* Soft central glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-yellow-200/20 via-blue-200/10 to-transparent rounded-full animate-pulse"></div>

      {/* Gentle sparkles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-24 left-32 w-2.5 h-2.5 bg-purple-300/60 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      <div className="absolute bottom-32 right-20 w-1 h-1 bg-cyan-300/60 rounded-full animate-ping" style={{ animationDelay: '3s', animationDuration: '3.5s' }}></div>

    </div>
  );
}