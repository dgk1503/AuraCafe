"use client";

import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const Cup = forwardRef((props: any, ref: any) => {
  const { scene } = useGLTF("/models/coffee/scene.gltf");

  return <primitive ref={ref} object={scene} scale={[35, 35, 35]} {...props} />;
});

export default Cup;
