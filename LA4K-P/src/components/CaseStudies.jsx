import React from "react";
import { motion } from "framer-motion";

/* ===================== COMPONENT ===================== */

export default function ScrollTriggered() {
  return (
    <div style={container}>
      {projects.map((project, i) => (
        <Card key={project.image} image={project.image} i={i} />
      ))}
    </div>
  );
}

function Card({ image, i }) {
  return (
    <motion.div
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
    >
      {/* Decorative splash (optional – keep or remove) */}
      {/* <div style={splash} /> */}

      {/* CARD */}
      <motion.div style={card} variants={cardVariants}>
        <img src={image} alt="" style={imageStyle} />
      </motion.div>
    </motion.div>
  );
}

/* ===================== ANIMATION ===================== */

const cardVariants = {
  offscreen: {
    y: 200,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -2,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
    },
  },
};

/* ===================== STYLES ===================== */

const container = {
  margin: "100px auto",
  maxWidth: 1000,
  paddingBottom: 200,
  width: "100%",
};

const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  marginBottom: -120,
};

const splash = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(120deg, #eee, #ddd)",
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card = {
  width: "720px",
  aspectRatio: "16 / 9",   
  borderRadius: 16,
  overflow: "hidden",
  background: "#000",
  boxShadow:
    "0 10px 40px rgba(0,0,0,0.2)",
  transformOrigin: "10% 60%",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

/* ===================== DATA ===================== */

const projects = [
  { image: "/images/StockPhoto.jpg" },
  { image: "/images/StockImage4.jpg" },
  { image: "/images/StockImage3.jpg" },
  { image: "/images/StockImage2.jpg" },
];
