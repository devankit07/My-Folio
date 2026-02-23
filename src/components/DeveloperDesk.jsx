import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

export default function DeveloperDesk(props) {
  const root = useRef();
  const leftShoulder = useRef();
  const rightShoulder = useRef();
  const head = useRef();
  const laptopScreen = useRef();
  const leftEye = useRef();
  const rightEye = useRef();

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f4d9c7", roughness: 0.8 }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Organic swaying
    if (root.current) {
      root.current.rotation.z = Math.sin(t * 0.5) * 0.01;
    }

    // 2. Typing movement (Pivot joints)
    if (leftShoulder.current && rightShoulder.current) {
      leftShoulder.current.rotation.x = -Math.PI / 3 + Math.sin(t * 12) * 0.1;
      rightShoulder.current.rotation.x = -Math.PI / 3 + Math.cos(t * 12) * 0.1;
    }

    // 3. Head movement
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.4) * 0.1;
      head.current.rotation.x = Math.sin(t * 1.5) * 0.05 + 0.1;
    }

    // 4. Blinking Logic (Every 3 seconds, blink for 0.1s)
    if (leftEye.current && rightEye.current) {
      const isBlinking = Math.floor(t % 3) === 0 && (t % 3) < 0.15;
      const eyeScale = isBlinking ? 0.1 : 1; // Flatten eye
      leftEye.current.scale.y = THREE.MathUtils.lerp(leftEye.current.scale.y, eyeScale, 0.5);
      rightEye.current.scale.y = THREE.MathUtils.lerp(rightEye.current.scale.y, eyeScale, 0.5);
    }

    // 5. Screen Glow
    if (laptopScreen.current) {
      laptopScreen.current.material.emissiveIntensity = 0.5 + Math.sin(t * 12) * 0.3;
    }
  });

  return (
    <group ref={root} {...props} dispose={null}>
      <pointLight position={[0.5, 2, 0.5]} intensity={1.5} color="#ffccaa" distance={5} />
      
      {/* DESK */}
      <mesh position={[0, -0.42, 0]} receiveShadow>
        <boxGeometry args={[4, 0.15, 1.8]} />
        <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* CHAIR */}
      <group position={[0, -0.5, -0.8]}>
        <RoundedBox args={[1.1, 1.2, 0.2]} radius={0.1} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#111" roughness={0.9} />
        </RoundedBox>
      </group>

      {/* DEVELOPER */}
      <group position={[0, -0.1, -0.4]}>
        <RoundedBox args={[0.6, 0.8, 0.4]} radius={0.1} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#2d3748" roughness={1} />
        </RoundedBox>

        {/* Head + Blinking Eyes */}
        <group ref={head} position={[0, 0.85, 0]}>
          <mesh material={skinMat}>
            <sphereGeometry args={[0.22, 32, 32]} />
          </mesh>
          {/* Eyes */}
          <mesh ref={leftEye} position={[-0.08, 0.05, 0.18]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="black" roughness={0} />
          </mesh>
          <mesh ref={rightEye} position={[0.08, 0.05, 0.18]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="black" roughness={0} />
          </mesh>
        </group>

        {/* Arms */}
        <group ref={leftShoulder} position={[-0.35, 0.7, 0.1]}>
          <mesh position={[0, -0.2, 0.15]} material={skinMat}>
            <cylinderGeometry args={[0.05, 0.04, 0.5]} />
          </mesh>
        </group>
        <group ref={rightShoulder} position={[0.35, 0.7, 0.1]}>
          <mesh position={[0, -0.2, 0.15]} material={skinMat}>
            <cylinderGeometry args={[0.05, 0.04, 0.5]} />
          </mesh>
        </group>
      </group>

      {/* LAPTOP (Reversed so logo faces user) */}
      <group position={[0, -0.28, 0.5]}>
        {/* Screen/Lid */}
        <group position={[0, 0, -0.38]} rotation={[0.4, 0, 0]}> 
          {/* Back of Lid (The part we see) */}
          <mesh position={[0, 0.45, -0.01]}>
            <boxGeometry args={[1.1, 0.7, 0.04]} />
            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* BRANDING: ankitfolio (now faces the developer/model side) */}
          <Text
            position={[0, 0.45, 0.035]}
            rotation={[0, 0, 0]} // Face towards the developer (inner side)
            fontSize={0.08}
            color="#ffffff"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          >
            ankitfolio
          </Text>

          {/* Actual Screen (flipped to face the camera; blue emissive) */}
          <mesh ref={laptopScreen} position={[0, 0.45, -0.02]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.05, 0.65]} />
            <meshStandardMaterial emissive="#0088ff" emissiveIntensity={1} color="#000" />
          </mesh>

          {/* EMAIL/CONTACT on screen */}
          <Text
            position={[0, 0.15, -0.021]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.06}
            color="#e6f7ff"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          >
            contact@ankitfolio.dev
          </Text>
        </group>
      </group>

      <ContactShadows position={[0, -1.1, 0]} opacity={0.6} scale={10} blur={2.5} far={2} />
    </group>
  );
}