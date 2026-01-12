import React from "react";
import { motion } from "framer-motion";

/* ===================== COMPONENT ===================== */

export default function ScrollTriggered() {
  return (
    <>
      <h1> SELECTED WORK </h1>
      <p>Explore the work that defines our craft and the results we deliver.</p>
      <div style={container}>
        {projects.map((project, i) => (
          <Card key={project.video} video={project.video} />
        ))}
      </div>
    </>
  );
}

function Card({ video }) {
  return (
    <motion.div
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6, once: false }} // ← re-triggers on scroll
    >
      <motion.div style={card} variants={cardVariants}>
        <video
          src={video}
          style={videoStyle}
          autoPlay
          muted
          loop
          playsInline
        />
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
  maxWidth: 1100,
  paddingBottom: 200,
  width: "100%",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginBottom: -140, // overlap effect like Aspekto
};

const card = {
  width: "100%",
  maxWidth: "1020px",
  aspectRatio: "16 / 9", // YouTube-style landscape
  borderRadius: 16,
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  transformOrigin: "10% 60%",
  height: "620px",
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

/* ===================== DATA ===================== */

const projects = [
  { video: "/videos/StockVideo.mp4" },
  { video: "/videos/StockVideo4.mp4" },
  { video: "/videos/StockVideo3.mp4" },
  { video: "/videos/StockVideo2.mp4" },
];
