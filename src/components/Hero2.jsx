import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Hero2.module.css";
import { urlFor } from "../sanityImage";


// Mobile-specific configs that bring images inward
const mobileConfigs = [
  { left: "10%", top: "15%", rotate: -4, speed: 1 },
  { left: "50%", top: "5%", rotate: 3, speed: 1.2 },
  { left: "5%", top: "50%", rotate: -2, speed: 0.8 },
  { left: "70%", top: "60%", rotate: 4, speed: 1 },
  { left: "15%", top: "75%", rotate: -3, speed: 0.9 },
  { left: "65%", top: "28%", rotate: 2, speed: 1.1 },
];

const configs = [
  { left: "5%", top: "10%", rotate: -4, speed: 1 },
  { left: "50%", top: "0%", rotate: 3, speed: 1.2 },
  { left: "40%", top: "55%", rotate: -2, speed: 0.8 },
  { left: "80%", top: "65%", rotate: 4, speed: 1 },
  { left: "10%", top: "70%", rotate: -3, speed: 0.9 },
  { left: "75%", top: "30%", rotate: 2, speed: 1.1 },
];


export default function Hero({ data }) {
  const titleControls = useAnimation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const raf = useRef(null);

  if (!data) return null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use mobile configs on small screens
  const currentConfigs = isMobile ? mobileConfigs : configs;

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
            scale: isMobile ? 1 : 1.02,
            transition: {
              duration: isMobile ? 5 : 1.2,
              ease: "easeIn",
            },
          }
    );
  }, [titleControls, isMobile, prefersReducedMotion]);

  return (
    <section className={styles.hero}>
      {/* FLOATING IMAGES */}
      <div className={styles.imageLayer}>
        {data.images?.map((img, i) => {
          const c = currentConfigs[i]; // Use currentConfigs
          if (!c) return null;

          return (
            <motion.div
              key={i}
              className={styles.imageCard}
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
                      // ADD ROTATION ANIMATION HERE:
                      rotate: [c.rotate, c.rotate + 5, c.rotate - 5, c.rotate],
                    }
                  : {
                      opacity: 0.8,
                      scale: 1,
                      rotate: c.rotate,
                      x: mouse.x * 20 * c.speed,
                      y: mouse.y * 15 * c.speed,
                    }
              }
              transition={
                isMobile
                  ? {
                      duration: 10,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      rotate: {
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }
                  : {
                      duration: 5,
                      ease: "easeIn",
                      repeat: 0,
                      x: { type: "spring", stiffness: 80, damping: 20 },
                      y: { type: "spring", stiffness: 80, damping: 20 },
                    }
              }
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
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={titleControls}
        >
          {data.title}
        </motion.h1>

        <motion.div
          className={styles.heroMeta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span>{data.metaLeft}</span>
          
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        ↓
        <p>Scroll Down</p>
      </motion.div>
    </section>
  );
}