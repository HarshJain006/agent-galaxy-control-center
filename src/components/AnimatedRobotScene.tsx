
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Robot() {
  const robotRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={robotRef}>
      {/* Robot Head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.2, 1.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 1.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot Arms */}
      <mesh position={[-0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function OrbitingAgent({ radius, speed, offset, color }: { radius: number; speed: number; offset: number; color: string }) {
  const agentRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (agentRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      agentRef.current.position.x = Math.cos(time) * radius;
      agentRef.current.position.z = Math.sin(time) * radius;
      agentRef.current.position.y = Math.sin(time * 2) * 0.5;
      agentRef.current.rotation.y = time;
    }
  });

  return (
    <group ref={agentRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export function AnimatedRobotScene() {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        {/* Central Robot */}
        <Robot />
        
        {/* Orbiting AI Agents - Inner Ring */}
        <OrbitingAgent radius={3} speed={1} offset={0} color="#00ff88" />
        <OrbitingAgent radius={3} speed={1} offset={Math.PI * 2 / 3} color="#ff6b6b" />
        <OrbitingAgent radius={3} speed={1} offset={Math.PI * 4 / 3} color="#4ecdc4" />
        
        {/* Orbiting AI Agents - Outer Ring */}
        <OrbitingAgent radius={4.5} speed={0.7} offset={Math.PI / 3} color="#ffd93d" />
        <OrbitingAgent radius={4.5} speed={0.7} offset={Math.PI} color="#ff9ff3" />
        <OrbitingAgent radius={4.5} speed={0.7} offset={Math.PI * 5 / 3} color="#54a0ff" />
        
        {/* Third Ring */}
        <OrbitingAgent radius={6} speed={0.5} offset={0} color="#5f27cd" />
        <OrbitingAgent radius={6} speed={0.5} offset={Math.PI / 2} color="#00d2d3" />
        <OrbitingAgent radius={6} speed={0.5} offset={Math.PI} color="#ff9f43" />
        <OrbitingAgent radius={6} speed={0.5} offset={Math.PI * 3 / 2} color="#ee5a24" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
