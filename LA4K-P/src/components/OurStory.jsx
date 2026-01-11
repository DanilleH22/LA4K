import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/OurStory.modules.css";

export default function OurStory() {
  const sectionRef = useRef(null);

  // Track scroll relative to THIS section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax motion values
  const leftImageY = useTransform(scrollYProgress, [0, 3], [100, -100]);
  const rightImageY = useTransform(scrollYProgress, [0, 3], [-100, 100]);

  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="our-story" ref={sectionRef}>
      <div className="our-story-inner">

        {/* Left image — moves UP while scrolling */}
        <motion.div
          className="our-story-image our-story-image-l"
          style={{ y: leftImageY }}
        >
          <div className="story-image-placeholder"></div>
        </motion.div>

        {/* Text — fades + slides in */}
        <motion.div
          className="our-story-text"
          // style={{ y: textY, opacity: textOpacity }}
        >
          <h2>
            We’re a team of filmmakers, strategists, and storytellers passionate
            about turning ideas into cinematic experiences.
          </h2>

          <p>
            We believe great stories <br />
            move people — not just inform.
          </p>

          <ul className="our-story-mission">
            <li><strong>Authenticity First:</strong> Human-centered storytelling.</li>
            <li><strong>Purposeful Craft:</strong> Strategy-led visuals.</li>
            <li><strong>Detail Obsessed:</strong> Precision from start to finish.</li>
          </ul>
        </motion.div>

        {/* Right image — moves DOWN while scrolling */}
        <motion.div
          className="our-story-image our-story-image-r"
          style={{ y: rightImageY }}
        >
          <div className="story-image-placeholder"></div>
        </motion.div>

      </div>
    </section>
  );
}
