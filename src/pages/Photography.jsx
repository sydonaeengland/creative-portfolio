import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import { PHOTOGRAPHY_PROJECTS, groupPhotographyByCategory, slugifyCategory } from '../data/photographyProjects.js';
import '../styles/photography.css';

const EASE = [0.16, 1, 0.3, 1];
const PHOTO_TAGS = ['Match Day', 'Portraits', 'Tournament Weekend', 'Detail Study'];

export default function Photography() {
  const groups = groupPhotographyByCategory(PHOTOGRAPHY_PROJECTS);

  return (
    <PageFade>
      <section className="photo-hero on-purple">
        <div className="photo-hero-gradient" aria-hidden="true" />
        <div className="photo-hero-noise" aria-hidden="true" />
        <svg className="photo-hero-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="photo-hero-line photo-hero-line-1"
            d="M -50 750 C 220 660, 360 860, 600 720 S 960 560, 1080 640"
            fill="none"
          />
          <path
            className="photo-hero-line photo-hero-line-2"
            d="M 150 -40 C 300 200, 120 340, 360 440 S 600 540, 520 760"
            fill="none"
          />
        </svg>
        <div className="photo-hero-watermark" aria-hidden="true">02</div>

        <div className="photo-hero-panel">
          <motion.h1
            className="photo-hero-title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            PHOTOGRAPHY
          </motion.h1>
          <motion.p
            className="photo-hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            I like freezing things that don't stay still — match days, portraits
            and quiet in-between moments.
          </motion.p>
          <motion.ul
            className="photo-hero-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {PHOTO_TAGS.map((t) => <li key={t}>{t}</li>)}
          </motion.ul>
        </div>

        <div className="photo-hero-collage">
          <motion.div
            className="photo-hero-tile photo-hero-tile-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            style={{ backgroundImage: "url('/assets/photography/lifestyle-portrait-braids.jpg')" }}
          />
          <motion.div
            className="photo-hero-tile photo-hero-tile-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            style={{ backgroundImage: "url('/assets/photography/dare-to-dream-overseas-team-photo-02.jpg')" }}
          />
          <motion.div
            className="photo-hero-tile photo-hero-tile-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            style={{ backgroundImage: "url('/assets/photography/dare-to-dream-allstar-match-day-15.jpg')" }}
          />
          <div className="photo-hero-scrim" aria-hidden="true" />
          <motion.span
            className="photo-hero-collage-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            A FEW FROM THE ARCHIVE
          </motion.span>
        </div>
      </section>

      <section className="album-wall">
        {groups.map(([category, projects], i) => (
          <Reveal
            key={category}
            as="article"
            className="album-card"
            variant="scale"
            delay={(i % 4) * 0.08}
          >
            <Link to={`/photography/${slugifyCategory(category)}`} className="album-card-link">
              <div className="album-card-cover">
                <img src={projects[0].image} alt={category} loading="lazy" />
              </div>
              <div className="album-card-meta">
                <span className="album-card-title">{category}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
