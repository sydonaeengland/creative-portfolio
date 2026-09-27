import { motion } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import SocialCarousel from '../components/SocialCarousel.jsx';
import CountUp from '../components/CountUp.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/social.css';

const EASE = [0.16, 1, 0.3, 1];
const SOCIAL_TAGS = ['Strategy', 'Live Coverage', 'Graphics', 'Captions'];

const SOCIAL_STATS = [
  { value: '8+', label: 'Accounts Managed' },
  { value: '200+', label: 'Posts Designed' },
  { value: '20+', label: 'Events Covered Live' },
];

const CAROUSEL_ITEMS = [
  { src: '/creative-portfolio/assets/graphics/dare-to-dream-instagram-grid-01.jpeg', label: 'DARE TO DREAM, INSTAGRAM GRID', alt: 'Dare to Dream Sporting Academy Instagram grid' },
  { src: '/creative-portfolio/assets/graphics/uwi-computing-instagram-grid.jpeg', label: 'UWI COMPUTING, INSTAGRAM GRID', alt: 'UWI Computing Instagram grid' },
  { src: '/creative-portfolio/assets/graphics/dare-to-dream-instagram-grid-02.jpeg', label: 'DARE TO DREAM, INSTAGRAM GRID', alt: 'Dare to Dream Sporting Academy Instagram grid' },
  { src: '/creative-portfolio/assets/graphics/social-media-page.jpeg', label: 'DARE TO DREAM, INSTAGRAM PROFILE GRID', alt: 'Dare to Dream Sporting Academy Instagram profile grid' },
];

export default function Social() {
  return (
    <PageFade>
      <section className="social-hero on-purple">
        <div className="social-hero-gradient" aria-hidden="true" />
        <div className="social-hero-noise" aria-hidden="true" />
        <svg className="social-hero-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="social-hero-line social-hero-line-1"
            d="M -50 750 C 220 660, 360 860, 600 720 S 960 560, 1080 640"
            fill="none"
          />
          <path
            className="social-hero-line social-hero-line-2"
            d="M 150 -40 C 300 200, 120 340, 360 440 S 600 540, 520 760"
            fill="none"
          />
        </svg>
        <div className="social-hero-watermark" aria-hidden="true">04</div>

        <div className="social-hero-panel">
          <motion.h1
            className="social-hero-title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            SOCIAL MEDIA<br />MANAGEMENT
          </motion.h1>
          <motion.p
            className="social-hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            Where design, photography, video and strategy stop being
            separate skills and start being one campaign.
          </motion.p>
          <motion.ul
            className="social-hero-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {SOCIAL_TAGS.map((t) => <li key={t}>{t}</li>)}
          </motion.ul>
        </div>
      </section>

      <Reveal as="section" className="social-role">
        <div className="social-role-text">
          <span className="tag">WHAT I ACTUALLY DO</span>
          <h2>NOT JUST POSTING.<br />RUNNING THE PAGE.</h2>
          <p>
            I manage these accounts end to end, shooting and editing the
            photos and videos, designing the graphics, writing the
            captions, scheduling and posting, and keeping the brand
            identity consistent across every post. That includes covering
            events live and cutting the highlights straight after, so the
            page isn't just polished graphics, it's actually there when
            things are happening.
          </p>
          <p>
            The feed also moves with what's actually going on instead of
            repeating the same post for five scrolls straight. Tournament
            season means the grid fills with tournament posts, starting
            lineups, live scores, recap reels. Once that's over, it shifts
            to whatever's next. The content follows the moment, not a
            template stuck on loop.
          </p>
        </div>

        <div className="social-stats">
          {SOCIAL_STATS.map((s) => (
            <div className="social-stat" key={s.label}>
              <span className="social-stat-value display"><CountUp value={s.value} /></span>
              <span className="social-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="social-phone">
          <div className="social-phone-notch" />
          <div className="social-phone-screen">
            <SocialCarousel items={CAROUSEL_ITEMS} />
          </div>
        </div>
      </Reveal>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
