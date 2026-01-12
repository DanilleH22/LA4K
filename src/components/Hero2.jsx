import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../styles/Hero2.css";

const images = [
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400",
  "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400",
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400",
  "https://images.unsplash.com/photo-1564327522418-91e587627d1d?w=400",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
];

const configs = [
  { left: "5%", top: "10%", rotate: -4, speed: 1 },
  { left: "70%", top: "8%", rotate: 3, speed: 1.2 },
  { left: "20%", top: "55%", rotate: -2, speed: 0.8 },
  { left: "80%", top: "65%", rotate: 4, speed: 1 },
  { left: "10%", top: "80%", rotate: -3, speed: 0.9 },
  { left: "60%", top: "30%", rotate: 2, speed: 1.1 },
];

export default function Hero() {
  const titleControls = useAnimation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const raf = useRef(null);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


  /* Mouse parallax (throttled) */
  useEffect(() => {
    const move = (e) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Title entrance */
useEffect(() => {
  titleControls.start(
    prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          scale: isMobile ? 1.03 : 1, // Animate to 1.03 once
          transition: {
            duration: isMobile ? 5 : 1.2,
            ease: "easeIn", // Only easing in, no repeat
          },
        }
  );
}, [titleControls, isMobile, prefersReducedMotion]);



  return (
    <section className="hero">
      {/* FLOATING IMAGES */}
      <div className="image-layer">
        {images.map((src, i) => {
          const c = configs[i];
          return (
            <motion.div
  key={i}
  className="image-card"
  style={{ left: c.left, top: c.top }}
  initial={{ opacity: 0, scale: 0.8, rotate: c.rotate - 20 }}
  animate={
    prefersReducedMotion
      ? { opacity: 0.25 }
      : isMobile
      ? {
          opacity: 0.25,
          scale: 1, // Once it reaches 1.03, it stays
          rotate: c.rotate,
          y: [0, -12 * c.speed, 0],
        }
      : {
          opacity: 0.25,
          scale: 1,
          rotate: c.rotate,
          x: mouse.x * 40 * c.speed,
          y: mouse.y * 30 * c.speed,
        }
  }
  transition={{
    duration: isMobile ? 10 : 4,
    ease: "easeIn", // Only ease in once
    repeat: 0, // No repeat animation
    x: { type: "spring", stiffness: 80, damping: 20 },
    y: { type: "spring", stiffness: 80, damping: 20 },
  }}
  whileHover={{
    scale: 1.03,
    opacity: 0.65,
    zIndex: 5,
  }}
  onViewportBoxUpdate={(info, delta) => {
    // Trigger only when image comes into view
    if (info.isInView && delta) {
      titleControls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
        },
      });
    }
  }}
>
  <img src={src} alt="" loading="lazy" />
</motion.div>

          );
        })}
      </div>

      {/* CENTER TEXT */}
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={titleControls}
        >
          LA4K
        </motion.h1>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span>VIDEO STUDIO</span>
          <span>LOS ANGELES, CA</span>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        ↓
      </motion.div>
    </section>
  );
}
