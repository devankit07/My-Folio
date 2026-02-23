import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function CuteRobot(props) {
  const group = useRef();
  const head = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const { mouse, viewport, clock } = useThree();
  const lastBlink = useRef(-10);
  const nextBlink = useRef(0); // first blink after ~2-3s
  const CLOSE_DUR = 0.08;
  const OPEN_DUR = 0.12;

  useFrame((state, delta) => {
    if (!group.current) return;
    // Map mouse (-1..1) to rotation and position targets
    const mx = THREE.MathUtils.clamp(mouse.x, -1, 1);
    const my = THREE.MathUtils.clamp(mouse.y, -1, 1);

    // Smoothly lerp group rotation (slight tilt)
    const targetRotX = -my * 0.25;
    const targetRotY = mx * 0.45;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.08
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      0.08
    );

    // Head looks a bit more than body
    if (head.current) {
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        -my * 0.45,
        0.12
      );
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        mx * 0.7,
        0.12
      );
    }

    // Smoothly follow cursor position (small translation)
    const targetX = mx * (viewport.width * 0.12);
    const targetY = -my * (viewport.height * 0.06);
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.06
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.06
    );

    // No floating (kept still) - still use time for eye pulse
    const t = state.clock.getElapsedTime();

    // Eyes gentle glow pulse
    const pulse = 1 + Math.sin(t * 2) * 0.12;
    if (leftEye.current) leftEye.current.material.emissiveIntensity = 1.2 * pulse;
    if (rightEye.current) rightEye.current.material.emissiveIntensity = 1.0 * pulse;

    // Facial expression: eye squint/tilt based on cursor
    let leftExpressiveScaleY = 1;
    let rightExpressiveScaleY = 1;
    if (leftEye.current && rightEye.current) {
      const absMx = Math.abs(mx);
      const absMy = Math.abs(my);
      const base = 1 - absMx * 0.12 - absMy * 0.08;
      leftExpressiveScaleY = THREE.MathUtils.clamp(base + mx * 0.08, 0.5, 1.2);
      rightExpressiveScaleY = THREE.MathUtils.clamp(base - mx * 0.08, 0.5, 1.2);

      // Slight eye tilt for expressiveness (applies regardless of blink)
      leftEye.current.rotation.z = THREE.MathUtils.lerp(
        leftEye.current.rotation.z || 0,
        -mx * 0.12,
        0.12
      );
      rightEye.current.rotation.z = THREE.MathUtils.lerp(
        rightEye.current.rotation.z || 0,
        -mx * 0.12,
        0.12
      );
    }

    // Blinking: trigger at random intervals (~2-3s) and animate close/open
    if (t > nextBlink.current) {
      lastBlink.current = t;
      nextBlink.current = t + 2 + Math.random() * 1; // schedule next blink in 2-3s
    }
    const blinkElapsed = t - lastBlink.current;
    let blinkFactor = 1; // 1 = open, 0 = closed
    if (blinkElapsed >= 0 && blinkElapsed < CLOSE_DUR) {
      // closing
      blinkFactor = 1 - blinkElapsed / CLOSE_DUR;
    } else if (blinkElapsed >= CLOSE_DUR && blinkElapsed < CLOSE_DUR + OPEN_DUR) {
      // opening
      blinkFactor = (blinkElapsed - CLOSE_DUR) / OPEN_DUR;
    } else if (blinkElapsed >= CLOSE_DUR + OPEN_DUR) {
      blinkFactor = 1;
    }

    // Compose expressive scale with blink factor (blink multiplies vertical scale)
    if (leftEye.current && rightEye.current) {
      const targetLeftY = THREE.MathUtils.clamp(leftExpressiveScaleY * blinkFactor, 0.05, 1.2);
      const targetRightY = THREE.MathUtils.clamp(rightExpressiveScaleY * blinkFactor, 0.05, 1.2);

      leftEye.current.scale.y = THREE.MathUtils.lerp(
        leftEye.current.scale.y || 1,
        targetLeftY,
        0.28
      );
      rightEye.current.scale.y = THREE.MathUtils.lerp(
        rightEye.current.scale.y || 1,
        targetRightY,
        0.28
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Torso - more mechanical, rounded box */}
      <RoundedBox
        args={[0.8, 1.0, 0.5]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#A9B3BD" roughness={0.25} metalness={0.9} />
      </RoundedBox>

      {/* Neck */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
        <meshStandardMaterial color="#8d959b" roughness={0.22} metalness={0.9} />
      </mesh>

      {/* Head group - contains head mesh, face plate and eyes so they move together */}
      <group ref={head} position={[0, 0.6, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.6, 0.5, 0.5]} radius={0.06} smoothness={6}>
          <meshStandardMaterial color="#D9E6F2" roughness={0.18} metalness={0.95} />
        </RoundedBox>

        {/* Face plate - dark glossy inset */}
        <mesh position={[0, 0.02, 0.26]} castShadow>
          <planeGeometry args={[0.46, 0.26, 1, 1]} />
          <meshStandardMaterial color="#0b0f14" metalness={1} roughness={0.03} />
        </mesh>

        {/* Eyes - circular, slightly protruding, children of head for cohesive movement */}
        <mesh ref={leftEye} position={[-0.14, 0.02, 0.29]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#062334" emissive="#6FB3FF" emissiveIntensity={1.2} metalness={0.5} roughness={0.08} />
        </mesh>
        <mesh ref={rightEye} position={[0.14, 0.02, 0.29]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#062334" emissive="#4AB0FF" emissiveIntensity={1.0} metalness={0.5} roughness={0.08} />
        </mesh>
      </group>

      {/* Antenna */}
      <group position={[0, 0.9, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
          <meshStandardMaterial color="#8d959b" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#4AB0FF" emissive="#4AB0FF" emissiveIntensity={0.9} />
        </mesh>
      </group>

      {/* Arms */}
      <group position={[0, 0, 0]}>
        {/* Left arm */}
        <group position={[-0.55, 0.05, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.4, 12]} />
            <meshStandardMaterial color="#A9B3BD" roughness={0.26} metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#8d959b" roughness={0.22} metalness={0.9} />
          </mesh>
        </group>
        {/* Right arm */}
        <group position={[0.55, 0.05, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.4, 12]} />
            <meshStandardMaterial color="#A9B3BD" roughness={0.26} metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#8d959b" roughness={0.22} metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Soft shadow receiver (plane) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

