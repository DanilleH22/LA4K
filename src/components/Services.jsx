import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/Services.modules.css";

export default function Services({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [buttonState, setButtonState] = useState("idle");

  const whatsappPhone = "447769873047";
  const whatsappMessage =
    "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  if (!data) return null;

  const handleGetInTouch = () => {
    setButtonState("loading");

    setTimeout(() => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
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

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Container variants
  const containerVariants = {
    collapsed: {},
    expanded: {
      transition: {
        staggerChildren: 0.15, // stagger card entrance
      },
    },
  };

  // Card variants
  const cardVariants = {
    collapsed: { opacity: 0, y: 30, scale: 0.9 },
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
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
        <motion.div
          className="cards-container"
          layout
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {data.services.map((service, i) => (
            <motion.div
              key={i}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 10px 20px rgba(78, 205, 196, 0.4)" }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>{service.description2}</p>
              <p>{service.description3}</p>
              <p>{service.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div>
        <a
          className="neon-btn"
          onClick={(e) => {
            e.preventDefault();
            handleGetInTouch();
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
