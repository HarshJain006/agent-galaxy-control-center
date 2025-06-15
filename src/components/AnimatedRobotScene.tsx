import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Trail, useTexture } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function Robot() {
  const robotRef = useRef<THREE.Group>(null);
  const logoTexture = useTexture('/photo-1485827404703-89b55fcc595e.jpg');
  
  useFrame((state) => {
    if (robotRef.current) {
      // More realistic swaying motion
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      
      // Slight tilting for more natural movement
      robotRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
      robotRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.7) * 0.03;
    }
  });

  return (
    <group ref={robotRef}>
      {/* Robot Head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={logoTexture} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.2, 1.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.2, 1.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial map={logoTexture} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot Arms */}
      <mesh position={[-0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Robot Chest Detail */}
      <mesh position={[0, 0.3, 0.41]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function OrbitingAgent({ radius, speed, offset, color, ringIndex }: { 
  radius: number; 
  speed: number; 
  offset: number; 
  color: string;
  ringIndex: number;
}) {
  const agentRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (agentRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      
      // More realistic orbital motion with slight elliptical orbits
      const ellipticalX = radius * 1.1;
      const ellipticalZ = radius * 0.9;
      
      agentRef.current.position.x = Math.cos(time) * ellipticalX;
      agentRef.current.position.z = Math.sin(time) * ellipticalZ;
      
      // Varying vertical oscillation based on ring
      const verticalFreq = 1.5 + ringIndex * 0.3;
      agentRef.current.position.y = Math.sin(time * verticalFreq) * (0.8 - ringIndex * 0.1);
      
      // More natural rotation with wobble
      agentRef.current.rotation.y = time + Math.sin(time * 2) * 0.2;
      agentRef.current.rotation.x = Math.sin(time * 1.3) * 0.1;
      agentRef.current.rotation.z = Math.cos(time * 0.8) * 0.1;
    }
  });

  return (
    <group ref={agentRef}>
      <Trail
        width={0.8 + ringIndex * 0.2}
        length={12 + ringIndex * 4}
        color={color}
        attenuation={(t) => t * t}
      >
        <Float speed={1.5 + Math.random() * 0.5} rotationIntensity={0.8} floatIntensity={0.3}>
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial 
              color={color} 
              metalness={0.95} 
              roughness={0.05} 
              emissive={color} 
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      </Trail>
    </group>
  );
}

export function AnimatedRobotScene() {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFD700" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FFD700" />
          <pointLight position={[0, 15, 0]} intensity={0.6} color="#FFFFFF" />
          
          {/* Central Robot */}
          <Robot />
          
          {/* Orbiting AI Agents - Inner Ring (Golden Yellow variants) */}
          <OrbitingAgent radius={3} speed={1.2} offset={0} color="#FFD700" ringIndex={0} />
          <OrbitingAgent radius={3} speed={1.2} offset={Math.PI * 2 / 3} color="#FFA500" ringIndex={0} />
          <OrbitingAgent radius={3} speed={1.2} offset={Math.PI * 4 / 3} color="#FFDF00" ringIndex={0} />
          
          {/* Orbiting AI Agents - Middle Ring (Black variants) */}
          <OrbitingAgent radius={4.5} speed={0.8} offset={Math.PI / 3} color="#333333" ringIndex={1} />
          <OrbitingAgent radius={4.5} speed={0.8} offset={Math.PI} color="#1A1A1A" ringIndex={1} />
          <OrbitingAgent radius={4.5} speed={0.8} offset={Math.PI * 5 / 3} color="#000000" ringIndex={1} />
          
          {/* Orbiting AI Agents - Outer Ring (Mixed golden and black) */}
          <OrbitingAgent radius={6} speed={0.6} offset={0} color="#B8860B" ringIndex={2} />
          <OrbitingAgent radius={6} speed={0.6} offset={Math.PI / 2} color="#2C2C2C" ringIndex={2} />
          <OrbitingAgent radius={6} speed={0.6} offset={Math.PI} color="#DAA520" ringIndex={2} />
          <OrbitingAgent radius={6} speed={0.6} offset={Math.PI * 3 / 2} color="#0F0F0F" ringIndex={2} />
          
          {/* Extra outer ring for more depth */}
          <OrbitingAgent radius={7.5} speed={0.4} offset={Math.PI / 4} color="#FFD700" ringIndex={3} />
          <OrbitingAgent radius={7.5} speed={0.4} offset={Math.PI * 3 / 4} color="#1C1C1C" ringIndex={3} />
          <OrbitingAgent radius={7.5} speed={0.4} offset={Math.PI * 5 / 4} color="#F4A460" ringIndex={3} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2 / 3}
        />
      </Canvas>
    </div>
  );
}
