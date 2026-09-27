import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';
import { JOURNEY_STATS, CHAPTERS } from '../data/milestones.js';

export default function JourneyPreview() {
  return (
    <section className="journey-preview" id="journey-preview">
      <Reveal as="p" className="journey-preview-label">
        <span className="journey-preview-label-num">01</span> / WHERE IT STARTED
      </Reveal>

      <div className="journey-preview-top">
        <Reveal as="h2" className="journey-preview-headline display">
          <span className="headline-line">IT STARTED WITH</span>
          <span className="headline-line purple">CURIOSITY.</span>
        </Reveal>

        <div className="journey-stats">
          {JOURNEY_STATS.map((s, i) => (
            <Reveal as="div" className="journey-stat" key={s.label} delay={i * 0.06}>
              <span className="journey-stat-value display">
                <CountUp value={s.value} />
              </span>
              <span className="journey-stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="journey-chapters">
        {CHAPTERS.map((c, i) => (
          <Reveal
            as="article"
            className={`journey-chapter${c.img ? '' : ' journey-chapter--plain'}`}
            key={c.num}
            delay={i * 0.06}
          >
            {c.img ? (
              <div className="journey-chapter-media" style={{ backgroundImage: `url("${c.img}")` }} />
            ) : (
              <div className="journey-chapter-media journey-chapter-media--plain" />
            )}
            <div className="journey-chapter-body">
              <span className="journey-chapter-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
