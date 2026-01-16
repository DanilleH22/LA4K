import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CaseStudies({ data }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!data) return null;

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);
const closeButton = {
  position: "absolute",
  top: isMobile ? "20px" : "45px",
  right: "0",
  background: "none",
  border: "none",
  color: "white",
  fontSize: "2.5rem",
  cursor: "pointer",
  padding: "5px 15px",
  zIndex: 1001,
};

const fullscreenVideo = {
  width: "100%",
  height: "auto",
  maxHeight: "80vh",
  objectFit: "contain",
  borderRadius: "8px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  position: "relative",
  top: "80px",
};

  return (
    <>
      <h1>{data.caseStudyHeading}</h1>
      <p>{data.caseStudyBody}</p>

      <div style={container}>
        {data.caseStudyMedia?.map((media, index) => (
          <Card 
            key={index} 
            video={media.asset.url} 
            onVideoClick={handleVideoClick}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedVideo && (
        <div style={modalOverlay} onClick={closeModal}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={closeButton} onClick={closeModal}>×</button>
            <video
              src={selectedVideo}
              style={fullscreenVideo}
              autoPlay
              muted
              loop
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}

function Card({ video, onVideoClick }) {
  return (
    <motion.div
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6, once: false }}
      onClick={() => onVideoClick(video)}
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
        {/* Play overlay icon */}
        <div style={playOverlay}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
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
  cursor: "pointer",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginBottom: -140,
};

const card = {
  width: "100%",
  maxWidth: "1020px",
  aspectRatio: "16 / 9",
  borderRadius: 16,
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  transformOrigin: "10% 60%",
  height: "620px",
  position: "relative",
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};
 
const playOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const cardContainerHover = {
  ...cardContainer,
  "&:hover $playOverlay": {
    opacity: 1,
  },
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "20px",
};

const modalContent = {
  position: "relative",
  width: "90vw",
  maxWidth: "1400px",
  maxHeight: "90vh",
};

// const closeButton = {
//   position: "absolute",
//   top: isMobile ? "80px" : "45px",
//   right: "0",
//   background: "none",
//   border: "none",
//   color: "white",
//   fontSize: "2.5rem",
//   cursor: "pointer",
//   padding: "5px 15px",
//   zIndex: 1001,
// };

// const fullscreenVideo = {
//   width: "100%",
//   height: "auto",
//   maxHeight: "80vh",
//   objectFit: "contain",
//   borderRadius: "8px",
//   boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
//   position: "relative",
//   top: "80px",
// };


    // width: 100%;
    // height: 60%;
    // max-height: 80vh;
    // object-fit: contain;
    // border-radius: 8px;
    // box-shadow: rgba(0, 0, 0, 0.5) 0px 20px 60px;
    

// Add hover effect
const styles = `
  .card-container:hover .play-overlay {
    opacity: 1 !important;
  }
`;

// Inject the hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export { cardContainerHover };