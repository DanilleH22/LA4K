// src/components/sections/VideoReel/VideoReel.jsx
import "../styles/VideoReel.modules.css";

export default function VideoReel() {
  return (
    <section className="video-reel">
      <div className="video-reel-inner">

        <div className="video-reel-header">
          <span className="eyebrow">Showreel</span>
          <h2>Turn Your Vision into Film</h2>
        </div>

        <div className="video-reel-video">
          {/* Replace with real video or modal later */}
          <div className="video-placeholder">
            <button className="play-button">
              ▶
            </button>
          </div>
        </div>
        <div className="video-reel-button">
            <button>Get in Touch</button>
        </div>
      </div>
    </section>
  );
}
