import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import "../styles/Services.modules.css";

export default function Services({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const [buttonState, setButtonState] = useState("idle");

  const whatsappPhone = "447769873047";
  const whatsappMessage =
    "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  if (!data) return null;

  const handleGetInTouch = () => {
    setButtonState("loading");

    setTimeout(() => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(
          whatsappMessage
        )}`;
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

  return (
    <section className="services-section">
      <h2>{data.sectionTitle}</h2>
      <p>{data.sectionSubtitle}</p>

      <div ref={ref} className="cards-wrapper">
        <motion.div
          layout
          className={`cards-container ${isInView ? "expanded" : "collapsed"}`}
          transition={{
            layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {data.services.map((service, i) => (
            <motion.div
              layout
              key={i}
              className="service-card"
              transition={{ layout: { duration: 0.9 } }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>{service.description2}</p>
              <p>{service.description3}</p>
              <p>{service.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div>
        <a
          className="neon-btn"
          onClick={(e) => {
            e.preventDefault();
            handleGetInTouch();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {buttonState === "loading" ? "Loading…" : "Get Started"}
        </a>
      </div>

      <h3 className="additional-services">{data.additionalServices}</h3>
    </section>
  );
}
