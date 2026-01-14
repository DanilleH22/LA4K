import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/OurStory.modules.css";
import { client } from "../sanity/client";
import { urlFor } from '../sanityImage';

export default function OurStory({ data }) {
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


  if (!data) return null;

  return (
    <section className="our-story" ref={sectionRef}>
      <div className="our-story-inner">

        {/* Left image/video */}
        <motion.div
          className="our-story-image our-story-image-l"
          style={{ y: leftImageY }}
        >
          {data.media?.[0]?._type === "image" ? (
            <img src={urlFor(data.media[0]).url()} alt={data.media[0]?.alt || ""} />
          ) : data.media?.[0]?._type === "file" ? (
            <video autoPlay muted loop playsInline>
              <source src={data.media[0].asset.url} type="video/mp4" />
            </video>
          ) : null}
        </motion.div>



        {/* Text — fades + slides in */}
        <motion.div
          className="our-story-text"
          // style={{ y: textY, opacity: textOpacity }}
        >
          <h2>
            {data.ourStoryHeading}
          </h2>

          <p>
            {data.ourStoryBody}
          </p>
    {data.missionStatements?.map((missionStatement, index) => (
          <ul className="our-story-mission">
            <li key={index}><strong>{missionStatement.title}:</strong> {missionStatement.description}</li>
          </ul>
        ))}
        </motion.div>

        {/* Right image/video */}
        <motion.div
          className="our-story-image our-story-image-r"
          style={{ y: rightImageY }}
        >
          {data.media?.[1]?._type === "image" ? (
            <img src={urlFor(data.media[1]).url()} alt={data.media[1]?.alt || ""} />
          ) : data.media?.[1]?._type === "file" ? (
            <video autoPlay muted loop playsInline>
              <source src={data.media[1].asset.url} type="video/mp4" />
            </video>
          ) : (
            <div className="story-image-placeholder" />
          )}
        </motion.div>


      </div>
    </section>
  );
}
