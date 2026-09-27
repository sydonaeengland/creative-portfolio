import { motion } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import VideoJustifiedGallery from '../components/VideoJustifiedGallery.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/videoEditing.css';

const EASE = [0.16, 1, 0.3, 1];
const VIDEO_TAGS = ['Jamaica Day', 'Airbnb', 'Clothing Brand', 'Sports'];

const VIDEO_GROUPS = [
  {
    category: 'Jamaica Day',
    items: [
      { cutLabel: 'CUT 01', label: 'JAMAICA DAY', src: '/creative-portfolio/assets/video/video-clip-03.mp4' },
    ],
  },
  {
    category: 'Airbnb',
    items: [
      { cutLabel: 'CUT 02', label: 'AIRBNB', src: '/creative-portfolio/assets/video/video-clip-04.mp4' },
      { cutLabel: 'CUT 03', label: 'AIRBNB', src: '/creative-portfolio/assets/video/video-clip-05.mp4' },
    ],
  },
  {
    category: 'Clothing Brand',
    items: [
      { cutLabel: 'CUT 04', label: 'CLOTHING BRAND', src: '/creative-portfolio/assets/video/video-clip-01.mp4' },
      { cutLabel: 'CUT 05', label: 'CLOTHING BRAND', src: '/creative-portfolio/assets/video/video-clip-02.mp4' },
    ],
  },
  {
    category: 'Sports',
    items: [
      { cutLabel: 'CUT 06', label: 'SPORTS', src: '/creative-portfolio/assets/video/video-clip-06.mp4' },
    ],
  },
];

export default function VideoEditing() {
  return (
    <PageFade>
      <section className="video-hero on-purple">
        <div className="video-hero-gradient" aria-hidden="true" />
        <div className="video-hero-noise" aria-hidden="true" />
        <svg className="video-hero-lines" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="video-hero-line video-hero-line-1"
            d="M -50 750 C 220 660, 360 860, 600 720 S 960 560, 1080 640"
            fill="none"
          />
          <path
            className="video-hero-line video-hero-line-2"
            d="M 150 -40 C 300 200, 120 340, 360 440 S 600 540, 520 760"
            fill="none"
          />
        </svg>
        <div className="video-hero-watermark" aria-hidden="true">03</div>

        <div className="video-hero-panel">
          <motion.h1
            className="video-hero-title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            VIDEOGRAPHY
          </motion.h1>
          <motion.p
            className="video-hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            Recaps, highlight reels and social cuts, edited to match the
            energy of the moment they came from.
          </motion.p>
          <motion.ul
            className="video-hero-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {VIDEO_TAGS.map((t) => <li key={t}>{t}</li>)}
          </motion.ul>
        </div>
      </section>

      <section className="video-wall">
        <div className="video-group-grid">
          {VIDEO_GROUPS.map((group) => (
            <div className="video-group" key={group.category}>
              <Reveal as="h2" className="video-group-title">{group.category}</Reveal>
              <VideoJustifiedGallery items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
