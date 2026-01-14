import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "../styles/Hero.modules.css";
import { client } from "../sanity/client";
import { urlFor } from '../sanityImage';

export default function Hero() {
  const containerRef = useRef(null);
  const controls = useAnimation();

  // Sample images/videos - replace with your actual assets
  const mediaItems = [
    {
      type: "image",
      src: "/images/StockPhoto.jpg",
      alt: "Cinematic production 1"
    },
    {
      type: "image",
      src: "/images/StockImage2.jpg",
      alt: "Film equipment"
    },
    {
      type: "image",
      src: "/images/StockPhoto.jpg",
      alt: "Video editing"
    },
    {
      type: "image",
      src: "/images/StockImage2.jpg",
      alt: "Camera work"
    }
  ];

  // For video items,  can use:
  // { type: "video", src: "/videos/hero1.mp4", poster: "/images/poster1.jpg" }

  // Calculate positions for orbiting media
  const getOrbitPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 200; // Orbit radius in pixels
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotation: (index / total) * 360,
    };
  };

  useEffect(() => {
    const animateOrbit = async () => {
      await controls.start({
        rotate: 360,
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };

    animateOrbit();
  }, [controls]);


   const [content, setContent] = useState(null);
  
     useEffect(() => {
    client.fetch(`*[_type == "hero"][0]{
      heroTitle,
      heroSubtitle
       heroMedia[]{
      _type,
      asset->{_id, url},
      alt
    }
    }`).then((data) => {
      console.log("HOME DATA:", data);
      setContent(data);
    });
  }, []);
  
    
    
      if (!content) {
      return <div style={{ color: 'white', padding: '2rem' }}>Loading Contact Us content…</div>;
    }

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero-container">
        
        {/* Background elements */}
        <div className="hero-bg">
          <div className="bg-grid"></div>
        </div>

        {/* Title in the center */}
        <div className="hero-title-wrapper">
          <motion.h1 
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            {content.heroTitle}
            <motion.span 
              className="hero-subtitle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {content.heroSubtitle}
            </motion.span>
          </motion.h1>
        </div>

        {/* Orbiting media container */}
        <motion.div 
  className="orbit-container"
  animate={controls}
  style={{ originX: "center", originY: "center" }}
>
  {content.heroMedia.map((item, index) => {
    const position = getOrbitPosition(index, content.heroMedia.length);

    return (
      <motion.div
        key={index}
        className="orbit-media"
        style={{ x: position.x, y: position.y }}
        initial={{ scale: 0, rotate: position.rotation }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{
          delay: 0.2 + index * 0.1,
          duration: 0.8,
          ease: "backOut",
          rotate: { duration: 30, ease: "linear", repeat: Infinity },
        }}
        whileHover={{ scale: 1.2, zIndex: 10, transition: { duration: 0.3 } }}
      >
        <div className="media-wrapper">
          {item._type === "image" ? (
            <img
              src={urlFor(item).url()}
              alt={item.alt || "Hero image"}
              className="orbit-image"
              loading="eager"
            />
          ) : (
            <video
              className="orbit-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={item.asset.url} type="video/mp4" />
            </video>
          )}

          <div className="media-glow"></div>
          <div className="orbit-connector"></div>
        </div>
      </motion.div>
    );
  })}
</motion.div>


        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div 
            className="scroll-line"
            animate={{ 
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="scroll-text">Explore</span>
        </motion.div>

        {/* Decorative particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ 
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50 
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: `+=${Math.random() * 200 - 100}`,
                y: `+=${Math.random() * 200 - 100}`,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}