'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 5000;

const vertexShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  attribute float a_size;
  varying float v_dist;

  void main() {
    vec3 pos = position;

    // Mouse repel: project mouse to world-ish space
    vec2 mouseWorld = u_mouse * 40.0;
    float dist = distance(pos.xy, mouseWorld);
    float repelRadius = 8.0;
    float repelStrength = 4.0;

    if (dist < repelRadius) {
      float force = (1.0 - dist / repelRadius) * repelStrength;
      vec2 dir = normalize(pos.xy - mouseWorld);
      pos.xy += dir * force;
    }

    // Subtle drift
    pos.z += sin(u_time * 0.3 + position.x * 0.3 + position.y * 0.2) * 0.15;
    pos.x += cos(u_time * 0.2 + position.z * 0.4) * 0.05;

    v_dist = dist;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = a_size * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float u_time;
  varying float v_dist;

  void main() {
    // Circular point
    vec2 uv = gl_PointCoord - vec2(0.5);
    float r = length(uv);
    if (r > 0.5) discard;

    // Soft edge
    float alpha = smoothstep(0.5, 0.1, r);

    // Slight color variation — mostly white, hint of blue near cursor
    float distFactor = clamp(v_dist / 12.0, 0.0, 1.0);
    vec3 col = mix(vec3(0.49, 0.83, 0.99), vec3(0.9, 0.9, 0.95), distFactor);

    gl_FragColor = vec4(col, alpha * 0.55);
  }
`;

interface ParticleFieldProps {
  mouseRef: React.MutableRefObject<[number, number]>;
}

export default function ParticleField({ mouseRef }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const uniformsRef = useRef({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  });

  const { positions, sizes } = useMemo(() => {
    const count = PARTICLE_COUNT;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      sizes[i] = Math.random() * 2.0 + 0.5;
    }

    return { positions, sizes };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniformsRef.current.u_time.value = t;
    uniformsRef.current.u_mouse.value.set(mouseRef.current[0], mouseRef.current[1]);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-a_size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
