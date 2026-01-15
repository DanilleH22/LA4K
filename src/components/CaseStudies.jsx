import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollTriggered({ data }) {
  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!data) return null;

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [selectedVideo]);

  const closeModal = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setSelectedVideo(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <h1>{data.caseStudyHeading}</h1>
      <p>{data.caseStudyBody}</p>

      <div style={container}>
        {data.caseStudyMedia?.map((media, index) => (
          <Card key={index} video={media.asset.url} onVideoClick={handleVideoClick} />
        ))}
      </div>

      {/* Modal */}
      {/* Fullscreen Modal */}
{/* Fullscreen Modal */}
{selectedVideo && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.95)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      overflowY: "auto", // allow scrolling if content is too tall
    }}
    onClick={closeModal}
  >
    <div
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "1400px",
        maxHeight: "90vh", // ensure it fits in viewport
        backgroundColor: "#000",
        borderRadius: "8px",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON ALWAYS VISIBLE */}
      <button
        onClick={closeModal}
        style={{
          position: "sticky", // stays visible at top
          top: 10,
          right: 10,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "none",
          // backgroundColor: "#222",
          color: "#fff",
          fontSize: 20,
          cursor: "pointer",
          zIndex: 100,
          alignSelf: "flex-end", // stick to top-right
          margin: 10,
        }}
      >
        ✕
      </button>

      {/* VIDEO */}
      <video
        src={selectedVideo}
        autoPlay
        // muted
        loop
        controls
        playsInline
        style={{
          width: "100%",
          maxHeight: "calc(70vh - 90px)", // leave room for button + padding
          objectFit: "contain",
          borderRadius: "20px",
          display: "block",
        }}
      />
    </div>
  </div>
)}
;
</>
  );
}

function Card({ video, onVideoClick }) {
  return (
    <motion.div
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4, once: false }}
      onClick={() => onVideoClick(video)}
    >
      <motion.div style={card} variants={cardVariants}>
        <video src={video} style={videoStyle} autoPlay muted loop playsInline />
        <div style={playOverlay}>
          <div style={playIcon}>
            <svg width="90" height="90" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===================== STYLES ===================== */
const container = {
  margin: "100px auto",
  maxWidth: 1200,
  width: "95%",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  cursor: "pointer",
};

const cardContainer = { display: "flex", justifyContent: "center" };
const card = {
  width: "100%",
  maxWidth: "1020px",
  aspectRatio: "16 / 9",
  borderRadius: 16,
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  position: "relative",
};
const videoStyle = { width: "100%", height: "100%", objectFit: "cover" };
const playOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // backgroundColor: "rgba(0,0,0,0.3)",
  opacity: 0,
  transition: "opacity 0.3s ease",
};
const playIcon = { background: "rgba(0,0,0,0.6)", borderRadius: "50%", padding: "20px" };

// Modal
const modalOverlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.95)",
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
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const fullscreenVideo = {
  width: "100%",
  height: "100%",
  objectFit: "contain", // ensures video stays inside modal
  borderRadius: "8px",
  display: "block",
};

const modalButtons = { position: "absolute", top: 15, right: 15, display: "flex", gap: "10px" };
const closeButton = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "#222",
  border: "none",
  color: "white",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: 10, // must be above video
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};



const fullscreenButton = {
  background: "#222",
  border: "none",
  color: "white",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
};

/* ===================== ANIMATION ===================== */
const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -2,
    transition: { type: "spring", bounce: 0.35, duration: 0.8 },
  },
};
