'use client';

import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import ParticleField from './ParticleField';

interface SceneCanvasProps {
  mouseRef: React.MutableRefObject<[number, number]>;
}

export default function SceneCanvas({ mouseRef }: SceneCanvasProps) {
  return (
    <div className="canvas-container" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ParticleField mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
