import { motion } from 'framer-motion';
import '../styles/hero.css';

const EASE = [0.16, 1, 0.3, 1];

const DISCIPLINES = ['Design', 'Photography', 'Video', 'Social Media'];

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <svg className="hero-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="hero-line-path hero-line-1"
          d="M -50 700 C 200 620, 380 820, 600 680 S 950 520, 1080 600"
          fill="none"
        />
        <path
          className="hero-line-path hero-line-2"
          d="M 200 -50 C 320 180, 160 320, 380 420 S 620 520, 560 720"
          fill="none"
        />
      </svg>

      <div className="hero-panel">
        <div className="hero-watermark" aria-hidden="true">SE</div>

        <div className="hero-title-block">
          <h1 className="hero-title">
            <motion.span
              className="serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
              Turning
            </motion.span>
            <motion.span
              className="sans"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            >
              IDEAS
            </motion.span>
            <motion.span
              className="serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            >
              into
            </motion.span>
            <motion.span
              className="sans"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            >
              EXPERIENCES.
            </motion.span>
          </h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            CREATIVE DEVELOPER
          </motion.p>
        </div>

        <motion.ul
          className="hero-disciplines"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          {DISCIPLINES.map((d, i) => (
            <li key={d}>
              <span className="n">0{i + 1}</span>
              {d}
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#handoff"
          className="hero-scroll"
          aria-label="Scroll to enter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
        >
          SCROLL <span className="hero-scroll-arrow">↓</span>
        </motion.a>
      </div>

      <div className="hero-photo-panel">
        <motion.img
          src="/creative-portfolio/assets/photography/sydonae-england-collage.png"
          alt="Sydonae England behind the camera"
          className="hero-photo-img"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        />
        <div className="hero-photo-scrim" aria-hidden="true" />
      </div>
    </header>
  );
}
