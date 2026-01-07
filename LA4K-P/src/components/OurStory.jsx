// src/components/sections/OurStory/OurStory.jsx
import "../styles/OurStory.modules.css";

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story-inner">

        {/* Left image */}
        <div className="our-story-image our-story-image-l">
          <div className="story-image-placeholder"></div>
        </div>

        {/* Text */}
        <div className="our-story-text">
          <h2>
            We’re a team of filmmakers, strategists, and storytellers passionate
            about turning ideas into cinematic experiences.
          </h2>

          <p>
            We believe great stories <br />
            move people — not just inform.
          </p>

          <ul className="our-story-mission">
            <li><strong>Authenticity First:</strong> Human-centered storytelling that feels real.</li>
            <li><strong>Purposeful Craft:</strong> Every visual has strategy at its core.</li>
            <li><strong>Detail Obsessed:</strong> From concept to execution with precision.</li>
          </ul>
        </div>

        {/* Right image */}
        <div className="our-story-image our-story-image-r">
          <div className="story-image-placeholder"></div>
        </div>

      </div>
    </section>
  );
}
