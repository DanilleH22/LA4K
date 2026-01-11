import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "../styles/Services.modules.css"

const services = [
  {
    title: "Photography",
    description: "Positioning, messaging & identity systems",
    description2: "Positioning, messaging & identity systems",
    description3: "Positioning, messaging & identity systems",
    price: "£1000",
  },
  {
    title: "Editing",
    description: "High-conversion, modern interfaces",
    description2: "High-conversion, modern interfaces",
    description3: "High-conversion, modern interfaces",
    price: "£800",
  },
  {
    title: "Videography",
    description: "React, performance & scalability",
    description2: "React, performance & scalability",
    description3: "React, performance & scalability",
    price: "£1200",
  },
  {
    title: "Drone Work",
    description: "Visual systems & storytelling",
    description2: "Visual systems & storytelling",
    description3: "Visual systems & storytelling",
    price: "£1500",
  },
];

export default function ServicesReveal() {
  const ref = useRef(null);
 const isInView = useInView(ref, {
  amount: 0.3,
});


  return (
    <section className="services-section">
      <h2>Services</h2>
      <p>What we services offer</p>

      <div ref={ref} className="cards-wrapper">
        <motion.div
          layout
          className={`cards-container ${isInView ? "expanded" : "collapsed"}`}
          transition={{
            layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {services.map((service, i) => (
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
     <a href="#" className="neon-btn">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Get Started!
</a>

</div>
      <h3 className="additional-services">Additional Services available upon request.</h3>
    </section>
  );
}
