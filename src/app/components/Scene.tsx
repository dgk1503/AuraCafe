"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import Cup from "./Cup";

export default function Scene({ scrollProgress }: any) {
  const cupRef = useRef<any>(null);

  useFrame(() => {
    const progress = scrollProgress?.current || 0;

    if (cupRef.current) {
      cupRef.current.position.y = 1 - progress * 2;
    }
  });

  return (
    <>
      
      <PerspectiveCamera
        fov={45}
        near={0.1}
        far={10000}
        makeDefault
        position={[0, 0, 10]}
      />

      <Environment preset="city" />

      <Cup ref={cupRef} />
    </>
  );
}
