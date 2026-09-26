import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import RawFinalToggle from '../components/RawFinalToggle.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import { DESIGN_PROJECTS } from '../data/designProjects.js';
import '../styles/design.css';

export default function Design() {
  const [active, setActive] = useState(null);

  return (
    <PageFade>
      <section className="page-intro purple-field on-purple">
        <div className="num-huge display">02 DESIGN</div>
        <p>Posters, campaign systems, event graphics, brand collateral — design
          built to be looked at twice.</p>
      </section>

      <section className="poster-wall">
        <div className="poster-grid">
          {DESIGN_PROJECTS.map((p) => (
            <Reveal key={p.id} as="article" className={`poster-card ${p.slot}`}>
              <div onClick={() => setActive(p)} data-cursor="VIEW ↗">
                {p.nameBehind && <div className="name-behind">{p.nameBehind}</div>}
                <div className="frame">
                  <Placeholder label={p.label} src={p.image} alt={p.label} />
                </div>
                <div className="meta">
                  <span className="title">{p.title}</span>
                  <span className="year">{p.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextArchive />
      <Footer />

      <AnimatePresence>
        {active && (
          <motion.div
            className="case-study"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <button className="case-close" onClick={() => setActive(null)}>CLOSE ×</button>
            <div className="case-hero">
              <h2 className="display">{active.title}</h2>
              <div className="case-meta">
                <div><div className="k">Role</div><div className="v">{active.role}</div></div>
                <div><div className="k">Year</div><div className="v">{active.year}</div></div>
                <div><div className="k">Tools</div><div className="v">{active.tools}</div></div>
              </div>
            </div>
            <div className="case-body">
              <div className="case-block">
                <h3>The Brief</h3>
                <p>{active.brief}</p>
              </div>
              <div className="case-block">
                <h3>The Process</h3>
                <p>{active.process}</p>
                <div className="visual-row">
                  <Placeholder label="SKETCH / EXPLORATION" />
                  <Placeholder label="ALT VERSION" />
                  <Placeholder label="MOCKUP" />
                </div>
              </div>
              <div className="case-block">
                <h3>The Result</h3>
                <div className="case-rf">
                  <RawFinalToggle
                    raw={<Placeholder label="EARLY SKETCH" />}
                    final={<Placeholder label={active.label} src={active.image} alt={active.label} />}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFade>
  );
}
