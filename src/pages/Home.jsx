import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import '../styles/home.css';

// The loading screen covers the page for ~2.7s (see useLoader in App.jsx)
// before it starts wiping away — this headline's entrance was firing at
// t=0 on mount, underneath the still-opaque loader, so by the time the
// loader cleared, the animation had already finished and the text just
// appeared static. Delay entrance to start as the loader begins revealing.
const HEADLINE_START_DELAY = 2.4;

const LINE_VARIANTS = {
  hidden: { opacity: 0, y: '0.55em', scale: 1.08, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: HEADLINE_START_DELAY + i * 0.17 },
  }),
};

export default function Home() {
  const heroRef = useRef(null);

  const clipX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const clipY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const headX = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });
  const headY = useSpring(useMotionValue(0), { stiffness: 140, damping: 22 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    function handleMove(e) {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      clipX.set(relX * -14);
      clipY.set(relY * -10);
      headX.set(relX * 8);
      headY.set(relY * 6);
    }
    function handleLeave() {
      clipX.set(0); clipY.set(0); headX.set(0); headY.set(0);
    }
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, [clipX, clipY, headX, headY]);

  return (
    <PageFade>
      <header className="hero purple-field on-purple" ref={heroRef}>
        <div className="hero-top">
          <span className="corner">SYDONAE ENGLAND</span>
          <span className="corner">CREATIVE ARCHIVE</span>
          <span className="corner">2026</span>
        </div>

        <div className="hero-mid">
          <motion.div className="hero-clippings" style={{ x: clipX, y: clipY }}>
            <div className="clip clip-1"><Placeholder label="PHOTO" /></div>
            <div className="clip clip-2"><Placeholder label="DESIGN" /></div>
            <div className="clip clip-3"><Placeholder label="FRAME" /></div>
            <div className="clip clip-4"><Placeholder label="PHOTO" /></div>
          </motion.div>
          <motion.h1 className="hero-headline display" style={{ x: headX, y: headY }}>
            <motion.span className="line" custom={0} variants={LINE_VARIANTS} initial="hidden" animate="visible">
              I MAKE
            </motion.span>
            <motion.span className="line" custom={1} variants={LINE_VARIANTS} initial="hidden" animate="visible">
              THINGS MOVE.
            </motion.span>
          </motion.h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-disciplines">DESIGN • PHOTOGRAPHY • VIDEO • SOCIAL</div>
          <div className="hero-scroll"><span>↓</span> SCROLL TO ENTER</div>
        </div>
      </header>

      <section className="handoff">
        <Reveal as="p" className="eyebrow" style={{ marginBottom: 24 }}>ONE CREATIVE. MANY MEDIUMS.</Reveal>
        <Reveal as="h2" className="handoff-headline display">
          ONE CREATIVE.<br />MANY MEDIUMS.
        </Reveal>
        <Reveal as="p" className="handoff-kicker">
          Code is the profession. Creativity is the constant.
        </Reveal>
        <Reveal as="p" className="handoff-copy">
          What started as a love for creating has grown into a journey across
          design, photography, video and social media. Each medium brings
          something different to the table, from capturing moments and
          telling stories to turning ideas into something people can see,
          feel and connect with. At the heart of it all is the same
          curiosity, passion and love for the creative process. Different
          mediums, one creative vision, and endless possibilities for what
          comes next.
        </Reveal>

        <Reveal className="discipline-strip">
          <span>DESIGN</span><span>PHOTO</span><span>VIDEO EDITING</span><span>SOCIAL</span>
        </Reveal>

        <Reveal className="handoff-cta">
          <p className="eyebrow">BUT IT DIDN'T START HERE.</p>
          <Link to="/journey" className="link-headline bulge-hover">
            01 FOLLOW THE JOURNEY <span className="arrow">↓</span>
          </Link>
        </Reveal>
      </section>
    </PageFade>
  );
}
