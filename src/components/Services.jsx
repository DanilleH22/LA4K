import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/Services.modules.css";

export default function Services({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [buttonState, setButtonState] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const whatsappPhone = "447769873047";
  const whatsappMessage =
    "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  if (!data) return null;

  const handleGetInTouch = () => {
    setButtonState("loading");

    setTimeout(() => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobileDevice) {
        window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}`;
      } else {
        window.open(
          `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(
            whatsappMessage
          )}`,
          "_blank"
        );
      }

      setButtonState("success");
      setTimeout(() => setButtonState("idle"), 2000);
    }, 800);
  };

  // Trigger animation on mount with mobile delay
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), isMobile ? 100 : 300);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Simplified variants for mobile
  const containerVariants = {
    collapsed: {},
    expanded: {
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.15, // Faster on mobile
      },
    },
  };

  const cardVariants = {
    collapsed: { opacity: 0, y: isMobile ? 15 : 30, scale: 0.95 },
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 150 : 120, // Snappier on mobile
        damping: isMobile ? 25 : 20,
        mass: isMobile ? 0.8 : 1, // Lighter on mobile
      },
    },
  };

  // Mobile-optimized hover
  const hoverProps = isMobile 
    ? {} // No hover on mobile
    : { 
        whileHover: { 
          y: -10, 
          scale: 1.03, 
          boxShadow: "0 10px 20px rgba(78, 205, 196, 0.4)",
          transition: { type: "spring", stiffness: 400, damping: 10 }
        } 
      };

  return (
    <section className="services-section">
      <h2>{data.sectionTitle}</h2>
      <p>{data.sectionSubtitle}</p>

      <motion.div
        className="cards-wrapper"
        variants={containerVariants}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
      >
        <div className="cards-container">
          {data.services.map((service, i) => (
            <motion.div
              key={i}
              className="service-card"
              variants={cardVariants}
              {...hoverProps}
              whileTap={isMobile ? { scale: 0.98 } : {}}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>{service.description2}</p>
              <p>{service.description3}</p>
              <p className="price">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div>
        <a
          className="neon-btn"
          onClick={(e) => {
            e.preventDefault();
            handleGetInTouch();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleGetInTouch();
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {buttonState === "loading" ? "Loading…" : "Get Started"}
        </a>
      </div>

      <h3 className="additional-services">{data.additionalServices}</h3>
    </section>
  );
}