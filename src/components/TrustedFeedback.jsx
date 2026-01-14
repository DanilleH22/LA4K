// src/components/sections/Feedback/Feedback.jsx
import { useEffect, useState } from "react";
import "../styles/TrustedFeedback.modules.css";
import { client } from "../sanity/client";
import { urlFor } from '../sanityImage';

export default function Feedback({ data }) {
  if (!data) return null;

  return (
    <section className="feedback">
      <div>
        <h1>{data.trustedFeedbackHeading}</h1>
      </div>

      <div className="feedback-inner">

        {/* Left Column */}
        <div className="feedback-column left">
          {data.feedbackLeft?.map((item, index) => (
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
          {data.trustedFeedbackMedia?.[0] ? (
            <img
              src={urlFor(data.trustedFeedbackMedia[0]).width(900).quality(80).url()}
              alt={data.trustedFeedbackMedia[0].alt || ''}
              className="section-image"
            />
          ) : (
            <img src="./images/StockImage5.jpg" alt="Feedback" />
          )}
        </div>

        {/* Right Column */}
        <div className="feedback-column right">
          {data.feedbackRight?.map((item, index) => (
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
