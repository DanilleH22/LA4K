import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CaseStudies({ data }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRefs = useRef([]);

  // YouTube embed URLs - simplified without autoplay in the URL
  const youtubeVideos = [
    "https://www.youtube.com/embed/yl5oPrBQi6k?si=jnchRCVK5n-lYdSh&amp;controls=0&start=1",
    "https://www.youtube.com/embed/ALzNl3iKo34?si=-hEjDErXGgUaFNWi&controls=0&start=1",
    "https://www.youtube.com/embed/W1kp2Ecd_r8?si=WHnWsNOl2cV48uFJ&controls=0&start=1", 
    "https://www.youtube.com/embed/eMTLsrzMIvw?si=hDUys6iHhyspTNOm&amp;controls=0&start=1"
  ];

  useEffect(() => {
    // Check if mobile
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Add click/touch listener to the entire document
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      
      // Try to play all videos after user interaction
      setTimeout(() => {
        videoRefs.current.forEach(ref => {
          if (ref && ref.contentWindow) {
            try {
              // Send play command to YouTube iframe
              ref.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch (error) {
              console.log("Could not autoplay video:", error);
            }
          }
        });
      }, 100);
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // ... rest of your component code remains the same until the Card component

  function Card({ videoUrl, index, onVideoClick, videoRef }) {
    // Extract video ID
    const extractVideoId = (url) => {
      const match = url.match(/embed\/([^?]+)/);
      return match ? match[1] : null;
    };

    // Create URL WITHOUT autoplay initially
    const createThumbnailUrl = (url) => {
      const videoId = extractVideoId(url);
      if (!videoId) return url;
      
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      embedUrl += '?rel=0&modestbranding=1&showinfo=0&playsinline=1';
      embedUrl += '&mute=1&controls=0&loop=1&playlist=' + videoId;
      
      if (url.includes('start=')) {
        const startMatch = url.match(/start=(\d+)/);
        if (startMatch) embedUrl += `&start=${startMatch[1]}`;
      }
      
      return embedUrl;
    };

    const videoId = extractVideoId(videoUrl);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Function to add autoplay to iframe src after user interaction
    const getIframeSrc = () => {
      const baseUrl = createThumbnailUrl(videoUrl);
      return baseUrl + '&autoplay=1';
    };

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
              ref={videoRef}
              src={getIframeSrc()}
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

  // ... rest of your code (styles, etc.)
}
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