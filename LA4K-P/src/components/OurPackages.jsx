// src/components/sections/OurPackages/OurPackages.jsx
import "../styles/OurPackages.modules.css";

export default function OurPackages() {
  return (
    <section className="our-packages">
        <h1 >Our Packages</h1>
      <div className="our-packages-inner">

        <div className="our-packages-text">

          <p>
           5/5
          </p>
          <p>Provided Services for 100s of clients</p>
          <h2>
            £150
          </h2>

          <ul className="our-packages-mission">
            <li><strong>Authenticity First:</strong> Human-centered storytelling that feels real.</li>
            <li><strong>Purposeful Craft:</strong> Every visual has strategy at its core.</li>
            <li><strong>Detail Obsessed:</strong> From concept to execution with precision.</li>
          </ul>

        </div>

        <div className="our-packages-image">
          <p>All Features Covered</p>

          
            <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
            </ul>
          
            <p>7-day money-back guarantee</p>
          
        </div>

      </div>
    </section>
  );
}
