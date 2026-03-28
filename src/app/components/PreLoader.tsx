"use client";

import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [hiding, setHiding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    
    const BUBBLE_COUNT = 28;
    type Bubble = {
      x: number; baseY: number; r: number;
      speed: number; amp: number; phase: number; alpha: number;
    };

    const bubbles: Bubble[] = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
      x:     (canvas.width / BUBBLE_COUNT) * i + Math.random() * 32 - 16,
      baseY: canvas.height * (0.55 + Math.random() * 0.25),
      r:     3 + Math.random() * 7,
      speed: 0.6 + Math.random() * 1.2,
      amp:   8  + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.35,
    }));

    
    const WAVE_PTS = 80;

    const draw = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const t = (ts - startTimeRef.current) / 1000; // seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      const waveY = (x: number, offset: number) =>
        canvas.height * 0.62 +
        Math.sin((x / canvas.width) * Math.PI * 3 + t * 1.2 + offset) * 14 +
        Math.sin((x / canvas.width) * Math.PI * 6 + t * 0.8 + offset) * 6;

      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i <= WAVE_PTS; i++) {
        const x = (i / WAVE_PTS) * canvas.width;
        ctx.lineTo(x, waveY(x, 0));
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      grad.addColorStop(0,   "rgba(124, 74, 30, 0.22)");
      grad.addColorStop(0.5, "rgba(44, 26, 14, 0.18)");
      grad.addColorStop(1,   "rgba(8,  6,  4, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      
      ctx.beginPath();
      for (let i = 0; i <= WAVE_PTS; i++) {
        const x = (i / WAVE_PTS) * canvas.width;
        i === 0 ? ctx.moveTo(x, waveY(x, 0)) : ctx.lineTo(x, waveY(x, 0));
      }
      ctx.strokeStyle = "rgba(200, 131, 42, 0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      
      ctx.beginPath();
      for (let i = 0; i <= WAVE_PTS; i++) {
        const x = (i / WAVE_PTS) * canvas.width;
        i === 0 ? ctx.moveTo(x, waveY(x, 1.4)) : ctx.lineTo(x, waveY(x, 1.4));
      }
      ctx.strokeStyle = "rgba(181, 101, 29, 0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      
      bubbles.forEach(b => {
        const y = b.baseY + Math.sin(t * b.speed + b.phase) * b.amp;

        
        const glow = ctx.createRadialGradient(b.x, y, 0, b.x, y, b.r * 2.5);
        glow.addColorStop(0,   `rgba(200, 131, 42, ${b.alpha * 0.5})`);
        glow.addColorStop(1,   "rgba(200, 131, 42, 0)");
        ctx.beginPath();
        ctx.arc(b.x, y, b.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

       
        const fill = ctx.createRadialGradient(b.x - b.r * 0.3, y - b.r * 0.3, 0, b.x, y, b.r);
        fill.addColorStop(0,   `rgba(245, 237, 224, ${b.alpha * 0.7})`);
        fill.addColorStop(0.6, `rgba(200, 131, 42,  ${b.alpha * 0.4})`);
        fill.addColorStop(1,   `rgba(44,  26,  14,  ${b.alpha * 0.15})`);
        ctx.beginPath();
        ctx.arc(b.x, y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x, y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 131, 42, ${b.alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.32, y - b.r * 0.32, b.r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 230, ${b.alpha})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => onComplete?.(), 700);
    }, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          1000,
        background:      "#080604",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:        "hidden",
        opacity:          hiding ? 0 : 1,
        visibility:      hiding ? "hidden" : "visible",
        transition:      "opacity 0.7s ease, visibility 0.7s ease",
      }}
    >
      
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset:    0,
          width:    "100%",
          height:   "100%",
        }}
      />

      
      <div
        style={{
          position:      "relative",
          zIndex:        1,
          textAlign:     "center",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "0.75rem",
          animation:     "acFadeUp 0.9s cubic-bezier(.22,1,.36,1) forwards",
        }}
      >
        <p
          style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      "clamp(3rem, 8vw, 5.5rem)",
            fontWeight:    300,
            fontStyle:     "italic",
            color:         "#C8832A",
            letterSpacing: "0.02em",
            lineHeight:    1,
            margin:        0,
          }}
        >
          Auracafe
        </p>

        <p
          style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      "0.7rem",
            fontWeight:    400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "#f5ede0",
            opacity:       0.4,
            margin:        0,
            animation:     "acFadeUp 1.1s 0.2s cubic-bezier(.22,1,.36,1) both",
          }}
        >
          Where coffee meets calm
        </p>
      </div>

      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=DM+Sans:wght@400&display=swap');

        @keyframes acFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}