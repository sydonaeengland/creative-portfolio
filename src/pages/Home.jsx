import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Hero from '../components/Hero.jsx';
import MediumsShowcase from '../components/MediumsShowcase.jsx';
import JourneyPreview from '../components/JourneyPreview.jsx';
import DesignPreview from '../components/DesignPreview.jsx';
import PhotographyPreview from '../components/PhotographyPreview.jsx';
import VideographyPreview from '../components/VideographyPreview.jsx';
import SocialPreview from '../components/SocialPreview.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/home.css';
import '../styles/journey.css';
import '../styles/contact.css';

export default function Home() {
  return (
    <PageFade>
      <Hero />

      <section id="handoff" className="handoff">
        <Reveal as="p" className="handoff-label">
          <span className="handoff-label-num">00</span> / ABOUT THE CREATIVE
        </Reveal>

        <div className="handoff-grid">
          <div className="handoff-copy-col">
            <Reveal as="h2" className="handoff-headline display">
              <span className="headline-line ink">ONE CREATIVE.</span>
              <span className="headline-line"><span className="ink">MANY</span> <span className="purple">MEDIUMS.</span></span>
            </Reveal>

            <Reveal as="div" className="handoff-statement" delay={0.1}>
              <p>CODE IS THE PROFESSION. <strong>CREATIVITY IS THE CONSTANT.</strong></p>
            </Reveal>

            <Reveal as="p" className="handoff-copy" delay={0.2}>
              What started as a love for creating has grown into a journey across
              design, photography, video and social media. Each medium brings
              something different to the table, from capturing moments and
              telling stories to turning ideas into experiences people can see,
              feel and connect with. At the heart of it all is the same
              curiosity, passion and love for the creative process. Different
              mediums, one creative vision, and endless possibilities for what
              comes next.
            </Reveal>

            <Reveal as="div" delay={0.3}>
              <a href="#journey-preview" className="handoff-arrow-cta">
                <span className="handoff-arrow-circle"><span className="arrow">↓</span></span>
                01 WHERE IT STARTED
              </a>
            </Reveal>
          </div>

          <Reveal as="div" delay={0.2} className="handoff-panels-col">
            <MediumsShowcase />
          </Reveal>
        </div>

        <div className="handoff-marquee" aria-hidden="true">
          <div className="handoff-marquee-track">
            {Array.from({ length: 3 }).map((_, i) => (
              <span className="handoff-marquee-set" key={i}>
                <span>DESIGN</span><span className="dot">✦</span>
                <span>PHOTOGRAPHY</span><span className="dot">✦</span>
                <span>VIDEO</span><span className="dot">✦</span>
                <span>SOCIAL MEDIA</span><span className="dot">✦</span>
                <span>DESIGN</span><span className="dot">✦</span>
                <span>PHOTOGRAPHY</span><span className="dot">✦</span>
                <span>VIDEO</span><span className="dot">✦</span>
                <span>SOCIAL MEDIA</span><span className="dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <JourneyPreview />
      <DesignPreview />
      <PhotographyPreview />
      <VideographyPreview />
      <SocialPreview />

      <section className="contact-section">
        <span className="contact-watermark" aria-hidden="true">05</span>

        <Reveal as="p" className="contact-label">
          <span className="contact-label-num">05</span> / CONTACT
        </Reveal>

        <div className="contact-top">
          <Reveal as="h2" className="contact-headline display">
            <span className="headline-line">LET'S MAKE SOMETHING</span>
            <span className="headline-line">WORTH <span className="purple">LOOKING AT.</span></span>
          </Reveal>

          <div className="contact-cta-col">
            <Reveal as="div" delay={0.1}>
              <a href="mailto:sydigitalstudios@gmail.com" className="contact-cta">
                <span className="contact-cta-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m3 6 9 6 9-6" />
                  </svg>
                </span>
                sydigitalstudios@gmail.com
                <span className="arrow">↗</span>
              </a>
            </Reveal>
            <Reveal as="div" delay={0.16}>
              <a href="https://instagram.com/sydigitalstudios" target="_blank" rel="noopener noreferrer" className="contact-cta">
                <span className="contact-cta-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                    <circle cx="12" cy="12" r="4.6" />
                    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                @sydigitalstudios
                <span className="arrow">↗</span>
              </a>
            </Reveal>
            <Reveal as="p" className="contact-sub" delay={0.22}>
              Whether it's a shoot, an edit, or a full brand system,
              if you've got an idea worth chasing, let's talk.
            </Reveal>
          </div>
        </div>

        <div className="contact-marquee" aria-hidden="true">
          <div className="contact-marquee-track">
            {Array.from({ length: 3 }).map((_, i) => (
              <span className="contact-marquee-set" key={i}>
                <span>LET'S TALK</span><span className="dot">✦</span>
                <span>AVAILABLE FOR GOOD IDEAS</span><span className="dot">✦</span>
                <span>LET'S TALK</span><span className="dot">✦</span>
                <span>AVAILABLE FOR GOOD IDEAS</span><span className="dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageFade>
  );
}
