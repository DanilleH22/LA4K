import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CaseStudies({ data }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // YouTube embed URLs
  const youtubeVideos = [
    "https://www.youtube.com/embed/yl5oPrBQi6k?si=jnchRCVK5n-lYdSh&controls=0&start=1",
    "https://www.youtube.com/embed/ALzNl3iKo34?si=-hEjDErXGgUaFNWi&controls=0&start=1",
    "https://www.youtube.com/embed/W1kp2Ecd_r8?si=WHnWsNOl2cV48uFJ&controls=0&start=1", 
    "https://www.youtube.com/embed/eMTLsrzMIvw?si=hDUys6iHhyspTNOmz&controls=0&start=1"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  // Extract video ID from URL
  const extractVideoId = (url) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  // Create autoplay URL for modal
  const createModalUrl = (url) => {
    const videoId = extractVideoId(url);
    if (!videoId) return url;
    
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    embedUrl += '?rel=0&modestbranding=1&showinfo=0';
    embedUrl += '&autoplay=1&playsinline=1';
    
    // Mobile requires muted autoplay
    if (isMobile) {
      embedUrl += '&mute=1';
    } else {
      embedUrl += '&mute=0';
    }
    
    // Add controls back for modal
    embedUrl += '&controls=1';
    
    if (url.includes('start=')) {
      const startMatch = url.match(/start=(\d+)/);
      if (startMatch) embedUrl += `&start=${startMatch[1]}`;
    }
    
    return embedUrl;
  };

  // Create thumbnail URL with autoplay for both mobile and desktop
  const createThumbnailUrl = (url) => {
    const videoId = extractVideoId(url);
    if (!videoId) return url;
    
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    embedUrl += '?rel=0&modestbranding=1&showinfo=0&playsinline=1';
    
    // For autoplay to work on both mobile and desktop, must be muted
    embedUrl += '&autoplay=1&mute=1&controls=0';
    
    // Loop the video
    embedUrl += '&loop=1&playlist=' + videoId;
    
    if (url.includes('start=')) {
      const startMatch = url.match(/start=(\d+)/);
      if (startMatch) embedUrl += `&start=${startMatch[1]}`;
    }
    
    return embedUrl;
  };

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

  return (
    <>
      <h1>{data?.caseStudyHeading || "Our Recent Work"}</h1>
      <p>{data?.caseStudyBody || "Check out our latest video productions"}</p>

      <div style={container}>
        {youtubeVideos.map((videoUrl, index) => (
          <Card 
            key={index} 
            videoUrl={videoUrl}
            index={index}
            onVideoClick={handleVideoClick}
            createThumbnailUrl={createThumbnailUrl}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedVideo && (
        <div style={modalOverlay} onClick={closeModal}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={closeButton} onClick={closeModal}>×</button>
            
            <iframe
              src={createModalUrl(selectedVideo)}
              style={{
                width: "100%",
                height: isMobile ? "auto" : "80vh",
                aspectRatio: "16/9",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                position: "relative",
                top: isMobile ? "40px" : "80px",
              }}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}

function Card({ videoUrl, index, onVideoClick, createThumbnailUrl }) {
  // Extract video ID
  const extractVideoId = (url) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <motion.div
      style={{
        ...cardContainer,
        marginTop: index > 0 ? "110px" : "0",
        zIndex: 10 - index
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6, once: true }}
      onClick={() => onVideoClick(videoUrl)}
      className="card-container"
    >
      <motion.div 
        style={card} 
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div style={videoWrapper}>
          <iframe
            src={createThumbnailUrl(videoUrl)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
            }}
            title={`YouTube video ${index + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            playsInline
            muted
          />
          
          <img 
            src={thumbnailUrl} 
            alt="Video thumbnail"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "none",
              pointerEvents: "none"
            }}
            onError={(e) => {
              if (e.target.src !== fallbackThumbnail) {
                e.target.src = fallbackThumbnail;
                e.target.style.display = "block";
              }
            }}
          />
        </div>
        
        <div style={playOverlay} className="play-overlay">
          <div style={playButton}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
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
    rotate: -5,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -2,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
      delay: 0.1
    },
  },
};

/* ===================== STYLES ===================== */
const container = {
  margin: "100px auto",
  maxWidth: 1100,
  paddingBottom: 100,
  width: "100%",
  cursor: "pointer",
  position: "relative",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginBottom: "-120px",
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
  height: "auto",
  position: "relative",
  cursor: "pointer",
};

const videoWrapper = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
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
  transition: "opacity 0.3s ease, background-color 0.3s ease",
  pointerEvents: "none",
};

const playButton = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  padding: "20px",
  backdropFilter: "blur(5px)",
};

const modalContent = {
  position: "relative",
  width: "90vw",
  maxWidth: "1400px",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

// Add hover effect
const styles = `
  .card-container:hover .play-overlay {
    opacity: 1 !important;
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  
  .card-container:hover {
    z-index: 20 !important;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}