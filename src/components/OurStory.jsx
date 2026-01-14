import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "react-bootstrap";
import "../styles/OurStory.modules.css";

export default function OurStory({ data }) {
  const [buttonState, setButtonState] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const whatsappPhone = "447769873047";
  const whatsappMessage =
    "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  const handleGetInTouch = () => {
    setButtonState("loading");

    setTimeout(() => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
        navigator.userAgent
      );

      if (isMobileDevice) {
        window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}`;

        setTimeout(() => {
          if (!document.hidden) {
            window.open(
              `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(
                whatsappMessage
              )}`,
              "_blank"
            );
          }
        }, 2000);
      } else {
        window.open(
          `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(
            whatsappMessage
          )}`,
          "_blank"
        );
      }

      setButtonState("success");
      setTimeout(() => setButtonState("idle"), 2000);
    }, 800);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!data) return null;

  return (
    <section className="our-story" ref={sectionRef}>
      {/* Background Video */}
      {data.backgroundVideo?.asset?.url && (
        <div className="background-video-container">
          <video
  className="background-video"
  autoPlay
  loop
  muted
  playsInline
>
  <source src={data.backgroundVideo.asset.url} type="video/mp4" />
  Your browser does not support the video tag.
</video>
          <div className="background-overlay"></div>
        </div>
      )}

      <div className="our-story-inner">
        {/* Text positioned bottom right */}
        <motion.div
          className="our-story-text"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h2>{data.ourStoryHeading}</h2>
          <p>{data.ourStoryBody}</p>

          {data.missionStatements?.map((missionStatement, index) => (
            <ul className="our-story-mission" key={index}>
              <li>
                <strong>{missionStatement.title}:</strong>{" "}
                {missionStatement.description}
              </li>
            </ul>
          ))}
        </motion.div>

        {/* Button positioned bottom right */}
        <Button
          variant="primary"
          className="button"
          disabled={buttonState === "loading"}
          href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          onClick={(e) => {
            e.preventDefault();
            handleGetInTouch();
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonState === "loading" ? "Loading…" : "Get in touch!"}
        </Button>
      </div>
    </section>
  );
}