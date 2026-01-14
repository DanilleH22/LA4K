import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../styles/Hero2.css";
import { urlFor } from "../sanityImage";

const configs = [
  { left: "5%", top: "10%", rotate: -4, speed: 1 },
  { left: "70%", top: "8%", rotate: 3, speed: 1.2 },
  { left: "20%", top: "55%", rotate: -2, speed: 0.8 },
  { left: "80%", top: "65%", rotate: 4, speed: 1 },
  { left: "10%", top: "80%", rotate: -3, speed: 0.9 },
  { left: "60%", top: "30%", rotate: 2, speed: 1.1 },
];

export default function Hero({ data }) {
  const titleControls = useAnimation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const raf = useRef(null);

  if (!data) return null;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Mouse parallax */
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
            scale: isMobile ? 1.03 : 1,
            transition: {
              duration: isMobile ? 5 : 1.2,
              ease: "easeIn",
            },
          }
    );
  }, [titleControls, isMobile, prefersReducedMotion]);

  return (
    <section className="hero">
      {/* FLOATING IMAGES */}
      <div className="image-layer">
        {data.images?.map((img, i) => {
          const c = configs[i];
          if (!c) return null;

          return (
            <motion.div
              key={i}
              className="image-card"
              style={{ left: c.left, top: c.top }}
              initial={{ opacity: 0, scale: 0.8, rotate: c.rotate - 20 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.8 }
                  : isMobile
                  ? {
                      opacity: 0.8,
                      scale: 1,
                      rotate: c.rotate,
                      y: [0, -12 * c.speed, 0],
                    }
                  : {
                      opacity: 0.8,
                      scale: 1,
                      rotate: c.rotate,
                      x: mouse.x * 20 * c.speed,
                      y: mouse.y * 15 * c.speed,
                    }
              }
              transition={{
                duration: isMobile ? 10 : 5,
                ease: "easeIn",
                repeat: 0,
                x: { type: "spring", stiffness: 80, damping: 20 },
                y: { type: "spring", stiffness: 80, damping: 20 },
              }}
              whileHover={{
                scale: 1.03,
                opacity: 0.8,
                zIndex: 5,
              }}
            >
              <img
                src={urlFor(img).width(400).quality(80).url()}
                alt=""
                loading="lazy"
              />
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
          {data.title}
        </motion.h1>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span>{data.metaLeft}</span>
          <span>{data.metaRight}</span>
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