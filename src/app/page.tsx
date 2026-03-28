"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Preloader from "./components/PreLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
gsap.registerPlugin(ScrollTrigger);
import Scene from "./components/Scene";
export default function Home() {
  const [loaded, SetLoaded] = useState(false);
  const mainRef = useRef(null);
  const SceneRef = useRef(null);
  const contentRef = useRef(null);
  const ScrollProgress = useRef(0);

  useEffect(() => {
    if (!mainRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          ScrollProgress.current = self.progress;
        },
      },
    });

    tl.to({}, { duration: 1 });

    tl.to(SceneRef.current, {
      filter: "blur(5px)",
      scale: 1.05,
      duration: 0.5,
    });
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div>
      {!loaded && (
        <div className="fixed inset-0 z-999 bg-black flex items-center justify-center">
          <Preloader onComplete={() => SetLoaded(true)} />
        </div>
      )}
      <div ref={mainRef} className="relative">
        <div className="fixed top-0 left-0 h-screen w-full" ref={SceneRef}>
          <Canvas frameloop="demand">
            <Scene ScrollProgress={ScrollProgress} />
          </Canvas>
        </div>

        <div className="h-[200vh]" />

        <div
          ref={contentRef}
          className="opacity-0 translate-y-10 pointer-events-none "
        >
          <Navbar />

          <div className="mx-auto flex flex-col bg-amber-700 font-bold text-xl text-black rounded-4xl w-80 h-20 text-center">
            AURACAFE
            <div>
              <p>Where coffee meets calm</p>
            </div>
          </div>

          <footer className="flex flex-col mt-auto">Footer bla bla</footer>
        </div>
      </div>
    </div>
  );
}
