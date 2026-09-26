import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/photography.css';

export default function Photography() {
  return (
    <PageFade>
      <section className="photo-intro">
        <Reveal as="p" className="eyebrow">03 / PHOTO</Reveal>
        <Reveal as="h1" className="display">
          I LIKE FREEZING THINGS<br />THAT DON'T STAY STILL.
        </Reveal>
      </section>

      <Reveal as="section" className="photo-block photo-full">
        <Placeholder label="FULL WIDTH — MATCH DAY, KINGSTON" />
        <div className="photo-caption"><span>Match Day, National Stadium</span><span>2022 · Canon 70D</span></div>
      </Reveal>

      <Reveal as="section" className="photo-block photo-pair">
        <Placeholder label="PORTRAIT — ATHLETE PROFILE" />
        <Placeholder label="DETAIL — SPIKES & TRACK" className="short" />
      </Reveal>
      <div className="photo-caption"><span>Track Season</span><span>2022 · 50mm</span></div>

      <Reveal as="section" className="photo-block annotation-float">
        <span className="annotation">shot this one myself ↑</span>
      </Reveal>

      <Reveal as="section" className="photo-block contact-sheet">
        <Placeholder label="" data-frame="01" />
        <Placeholder label="" data-frame="02" />
        <Placeholder label="" data-frame="03" />
        <Placeholder label="" data-frame="04" />
        <Placeholder label="" data-frame="05" />
      </Reveal>
      <div className="photo-caption"><span>Contact Sheet — Tournament Weekend</span><span>2022 · 35mm</span></div>

      <Reveal as="section" className="photo-block photo-portrait">
        <Placeholder label="LARGE PORTRAIT" />
        <div className="photo-caption" style={{ maxWidth: 720, margin: '14px auto 0', padding: 0 }}>
          <span>Off-season</span><span>2023</span>
        </div>
      </Reveal>

      <Reveal as="section" className="photo-block detail-trio">
        <Placeholder label="DETAIL — HANDS" />
        <Placeholder label="DETAIL — TEXTURE" />
        <Placeholder label="DETAIL — LIGHT" />
      </Reveal>
      <div className="photo-caption"><span>Detail Study</span><span>2023 · 85mm</span></div>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
