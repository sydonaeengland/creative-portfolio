import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import RawFinalToggle from '../components/RawFinalToggle.jsx';
import VideoCard from '../components/VideoCard.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/videoEditing.css';

const VIDEOS = [
  { cutLabel: 'CUT 04', label: 'VIDEO — CHAMPIONS CAMPAIGN EDIT', filename: 'champions_final_v3.mp4' },
  { cutLabel: 'CUT 02', label: 'VIDEO — JAMAICA DAY RECAP', filename: 'jamday_recap_edit.mp4' },
  { cutLabel: 'CUT 01', label: 'VIDEO — TOURNAMENT HIGHLIGHT REEL', filename: 'tournament_highlights.mp4' },
  { cutLabel: 'CUT 03', label: 'VIDEO — AIRBNB LISTING TEASER', filename: 'airbnb_teaser_15s.mp4' },
];

export default function VideoEditing() {
  return (
    <PageFade>
      <section className="motion-intro">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>04 / VIDEO EDITING</p>
        <h1 className="display">04 VIDEO EDITING.</h1>
        <p className="timecode">00:00:04:12 — REC ●</p>
      </section>

      <section className="video-grid">
        {VIDEOS.map((v) => (
          <Reveal key={v.filename}>
            <VideoCard {...v} />
          </Reveal>
        ))}
      </section>

      <Reveal as="section" className="stage-strip">
        <h3>CHAMPIONS CAMPAIGN — BUILD</h3>
        <div className="stage-row">
          <div className="stage-item">
            <Placeholder label="CONCEPT BOARD" />
            <div className="tag">01 · CONCEPT</div>
          </div>
          <div className="stage-item">
            <Placeholder label="RAW SOURCE CLIP" dark />
            <div className="tag">02 · RAW</div>
          </div>
          <div className="stage-item">
            <Placeholder label="TIMELINE / EDIT" dark />
            <div className="tag">03 · EDIT</div>
          </div>
          <div className="stage-item">
            <Placeholder label="FINAL EXPORT" />
            <div className="tag">04 · FINAL</div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="stage-strip" style={{ marginTop: -100 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          SOURCE → FINISHED
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-soft)', fontWeight: 400 }}>
            try the toggle ↓
          </span>
        </h3>
        <RawFinalToggle
          stageStyle={{ marginTop: 14, aspectRatio: '16/8', maxWidth: 900 }}
          raw={<Placeholder label="SOURCE CLIP — UNGRADED" dark />}
          final={<Placeholder label="FINISHED EDIT — GRADED + SCORED" dark />}
        />
      </Reveal>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
