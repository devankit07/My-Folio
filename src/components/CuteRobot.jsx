import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function CuteRobot(props) {
  const group = useRef();
  const head = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const { mouse } = useThree();
  
  // Animation refs
  const lastBlink = useRef(-10);
  const nextBlink = useRef(0);
  const CLOSE_DUR = 0.08;
  const OPEN_DUR = 0.12;

  useFrame((state) => {
    if (!group.current) return;
    const mx = THREE.MathUtils.clamp(mouse.x, -1, 1);
    const my = THREE.MathUtils.clamp(mouse.y, -1, 1);

    // Dynamic rotation for shading highlights
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.2, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.4, 0.1);

    if (head.current) {
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -my * 0.4, 0.15);
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, mx * 0.6, 0.15);
    }

    const t = state.clock.getElapsedTime();
    
    // Eyes pulse shading
    const pulse = 1 + Math.sin(t * 2.5) * 0.2;
    if (leftEye.current) leftEye.current.material.emissiveIntensity = 1.5 * pulse;
    if (rightEye.current) rightEye.current.material.emissiveIntensity = 1.2 * pulse;

    // Blink Logic
    if (t > nextBlink.current) {
      lastBlink.current = t;
      nextBlink.current = t + 2 + Math.random() * 2;
    }
    const blinkElapsed = t - lastBlink.current;
    let bF = 1;
    if (blinkElapsed < CLOSE_DUR) bF = 1 - blinkElapsed / CLOSE_DUR;
    else if (blinkElapsed < CLOSE_DUR + OPEN_DUR) bF = (blinkElapsed - CLOSE_DUR) / OPEN_DUR;

    if (leftEye.current && rightEye.current) {
      leftEye.current.scale.y = THREE.MathUtils.lerp(leftEye.current.scale.y, bF, 0.3);
      rightEye.current.scale.y = THREE.MathUtils.lerp(rightEye.current.scale.y, bF, 0.3);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      
      {/* TORSO: Deep Shadow Shading */}
      <RoundedBox args={[0.8, 1.0, 0.5]} radius={0.1} smoothness={4} position={[0, -0.2, 0]} castShadow>
        <meshStandardMaterial 
          color="#F1F5F9"        // Light Base
          emissive="#94A3B8"    // Soft Blue-Grey shade
          emissiveIntensity={0.2} 
          roughness={0.05} 
          metalness={0.8} 
        />
      </RoundedBox>

      {/* HEAD: Ceramic Gloss Shading */}
      <group ref={head} position={[0, 0.6, 0]} castShadow>
        <RoundedBox args={[0.6, 0.5, 0.5]} radius={0.08} smoothness={6}>
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive="#E2E8F0" 
            emissiveIntensity={0.1}
            roughness={0.1} 
            metalness={0.4} 
          />
        </RoundedBox>

        {/* FACE PLATE: Gradient Dark Shade */}
        <mesh position={[0, 0.02, 0.26]}>
          <planeGeometry args={[0.48, 0.28]} />
          <meshStandardMaterial 
            color="#020617" 
            roughness={0} 
            metalness={1} 
          />
        </mesh>

        {/* EYES: Inner Glow Shade */}
        <mesh ref={leftEye} position={[-0.15, 0.02, 0.29]}>
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshStandardMaterial 
            color="#000" 
            emissive="#0EA5E9" 
            emissiveIntensity={2} 
          />
        </mesh>
        <mesh ref={rightEye} position={[0.15, 0.02, 0.29]}>
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshStandardMaterial 
            color="#000" 
            emissive="#0EA5E9" 
            emissiveIntensity={2} 
          />
        </mesh>
      </group>

      {/* JOINTS & ANTENNA: Chrome Shade */}
      <group position={[0, 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#64748B" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.045]} />
          <meshStandardMaterial color="#0EA5E9" emissive="#38BDF8" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* ARMS: Matte-Shadow Shading */}
      <group position={[-0.58, -0.1, 0]}>
         <mesh><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#CBD5E1" metalness={0.8} /></mesh>
      </group>
      <group position={[0.58, -0.1, 0]}>
         <mesh><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#CBD5E1" metalness={0.8} /></mesh>
      </group>

    </group>
  );
}