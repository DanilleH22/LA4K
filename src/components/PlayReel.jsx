// src/components/sections/PlayReel/PlayReel.jsx
import "../styles/PlayReel.modules.css";

export default function PlayReel() {
  return (
    <section className="play-reel">
      <div className="play-reel-inner">

        <div className="play-reel-header">
          <span className="eyebrow">Showreel</span>
          <h2>Watch Our Work in Motion</h2>
        </div>

        <div className="play-reel-video">
          {/* Replace with real video or modal later */}
          <div className="video-placeholder">
            <button className="play-button">
              ▶
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
