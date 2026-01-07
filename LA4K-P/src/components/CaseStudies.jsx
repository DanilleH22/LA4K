// src/components/sections/CaseStudies/CaseStudies.jsx
import "../styles/CaseStudies.modules.css";

export default function CaseStudies() {
  return (
    <section className="case-studies">
      <div className="case-studies-inner">

        <div className="case-studies-header">
          <span className="eyebrow">Selected Work</span>
          <h2>Case Studies</h2>
          <p>Explore a selection of our recent projects that showcase our expertise in storytelling, brand strategy, and creative production.</p>
        </div>

        <div className="case-studies-grid">

          <article className="case-card">
            <div className="case-image"></div>
            <div className="case-meta">
              <h3>Brand Film for Studio X</h3>
              <p>Brand Strategy · Film Production</p>
            </div>
          </article>

          <article className="case-card">
            <div className="case-image"></div>
            <div className="case-meta">
              <h3>Product Launch Campaign</h3>
              <p>Creative Direction · Social Content</p>
            </div>
          </article>

          <article className="case-card">
            <div className="case-image"></div>
            <div className="case-meta">
              <h3>Documentary Short</h3>
              <p>Storytelling · Cinematography</p>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
