import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../styles/Hero2.css';

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleControls = useAnimation();
  const gridControls = useAnimation();

  const gridImages = [
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564327522418-91e587627d1d?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop',
  ];

  // Enhanced positions with staggered entrance
  const imageConfigs = [
    { left: '5%', top: '10%', width: 160, height: 100, rotate: -3, delay: 0.1, speed: 1.0 },
    { left: '70%', top: '5%', width: 140, height: 90, rotate: 2, delay: 0.2, speed: 1.2 },
    { left: '15%', top: '60%', width: 150, height: 95, rotate: -1, delay: 0.3, speed: 0.8 },
    { left: '80%', top: '65%', width: 170, height: 110, rotate: 4, delay: 0.4, speed: 1.1 },
    { left: '10%', top: '85%', width: 130, height: 85, rotate: -2, delay: 0.5, speed: 0.9 },
    { left: '75%', top: '25%', width: 160, height: 100, rotate: 1, delay: 0.6, speed: 1.3 },
    { left: '30%', top: '15%', width: 140, height: 90, rotate: -4, delay: 0.7, speed: 0.7 },
    { left: '85%', top: '45%', width: 150, height: 95, rotate: 3, delay: 0.8, speed: 1.0 },
    { left: '20%', top: '35%', width: 120, height: 80, rotate: -1, delay: 0.9, speed: 1.4 },
    { left: '65%', top: '75%', width: 160, height: 100, rotate: 2, delay: 1.0, speed: 0.6 },
    { left: '40%', top: '80%', width: 140, height: 90, rotate: -3, delay: 1.1, speed: 1.1 },
    { left: '90%', top: '90%', width: 130, height: 85, rotate: 1, delay: 1.2, speed: 0.8 },
  ];

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Title entrance animation
  useEffect(() => {
    const animateEntrance = async () => {
      await titleControls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0.6, 0.05, -0.01, 0.9] // Custom bounce curve
        }
      });
      
      // Subttyle pulse animation
      titleControls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    };

    animateEntrance();
  }, [titleControls]);

  // Calculate parallax offset for images
  const getParallaxOffset = (speed) => ({
    x: mousePosition.x * 20 * speed,
    y: mousePosition.y * 15 * speed
  });

  return (
    <div className="hero-container">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Rotating Overlapping Images with Framer Motion */}
      <div className="rotating-image-grid">
        {gridImages.map((imgSrc, index) => {
          const config = imageConfigs[index];
          const parallax = getParallaxOffset(config.speed);
          
          return (
            <motion.div
              key={index}
              className="rotating-image"
              style={{
                left: config.left,
                top: config.top,
                width: `${config.width}px`,
                height: `${config.height}px`,
                '--start-rotate': `${config.rotate}deg`,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                rotate: config.rotate - 10,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              animate={{ 
                opacity: 0.2,
                scale: 1,
                rotate: config.rotate,
                x: parallax.x,
                y: parallax.y
              }}
              transition={{
                delay: config.delay,
                duration: 1,
                ease: "backOut",
                opacity: { duration: 0.8 },
                x: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                },
                y: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }}
              whileHover={{
                opacity: 0.4,
                scale: 1.1,
                rotate: config.rotate + 5,
                zIndex: 100,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
            >
              <motion.div 
                className="image-frame"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <img 
                  src={imgSrc} 
                  alt={`Production ${index + 1}`}
                  loading="lazy"
                />
                <div className="image-tint"></div>
                
                {/* Floating label */}
                <motion.div 
                  className="image-label"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Image {index + 1}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Main LA4K Text with animations */}
      <div className="main-content">
        <motion.h1 
          className="main-title"
          initial={{ scale: 0.8,  y: 50 }}
          animate={titleControls}
        >
          LA4K
          {/* Glow effect */}
          <motion.span 
            className="title-glow"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h1>
        
        <motion.div 
          className="title-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.span 
            className="dot"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ◉
          </motion.span>
          <motion.span 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            VIDEO STUDIO
          </motion.span>
          <motion.span 
            className="location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            LOS ANGELES, CA ⚲
          </motion.span>
        </motion.div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <motion.div 
        className="scroll-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="arrow"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↓
        </motion.div>
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          SCROLL DOWN
        </motion.span>
      </motion.div>
    </div>
  );
}

export default Hero;