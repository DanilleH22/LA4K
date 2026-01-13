// src/components/sections/Feedback/Feedback.jsx
import "../styles/TrustedFeedback.modules.css";


const feedbackData = {
  left: [
    {
      quote: "Working with Aspekto was seamless and creative.",
      author: "David Miller",
      project: "Future",
    },
    {
      quote: "Their storytelling and production blew us away.",
      author: "Emma Collins",
      project: "Horizon",
    },
  ],
  right: [
    {
      quote: "Professional, talented, and highly communicative team.",
      author: "Olivia Harris",
      project: "Beyond",
    },
    {
      quote: "Exceeded expectations on every level.",
      author: "Daniel Scott",
      project: "Rocket",
    },
  ],
};

export default function Feedback() {
  return (
    <section className="feedback">

<div>
    <h1>Feedback</h1>

</div>

      <div className="feedback-inner">

        {/* Left Column */}
        <div className="feedback-column left">
          {feedbackData.left.map((item, index) => (
            <div className="feedback-card" key={index}>
              <p className="feedback-quote">❝ {item.quote}</p>
              <span className="feedback-author">
                {item.author} • {item.project}
              </span>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="feedback-image">
          
            {/* Placeholder for center image */}
            <img src="./images/StockImage5.jpg" alt="Feedback"  />
          
        </div>

        {/* Right Column */}
        <div className="feedback-column right">
          {feedbackData.right.map((item, index) => (
            <div className="feedback-card" key={index}>
              <p className="feedback-quote">❝ {item.quote}</p>
              <span className="feedback-author">
                {item.author} • {item.project}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
