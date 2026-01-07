import "../styles/Services.modules.css";

export default function Services() {
  return (
    <section className="services">
        <div className="services-inner">
            <h1>Services</h1>
        </div>

        <div>
            <ul>
                <li>Production</li>
                <li>Editing</li>
                <li>Color Grading</li>
                <li>Visual Effects</li>
            </ul>
        </div>

        <div>
            <button>Services</button>
        </div>
    </section>

  );
}