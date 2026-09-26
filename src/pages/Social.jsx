import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import RawFinalToggle from '../components/RawFinalToggle.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/social.css';

export default function Social() {
  return (
    <PageFade>
      <section className="social-intro">
        <Reveal as="p" className="eyebrow">05 / SOCIAL</Reveal>
        <Reveal as="h1" className="display">CREATIVITY WITH<br />A PURPOSE.</Reveal>
        <Reveal as="p">
          Where design, photography, video and strategy stop being
          separate skills and start being one campaign.
        </Reveal>
      </section>

      <Reveal as="article" className="campaign">
        <div className="campaign-text">
          <span className="tag">CAMPAIGN 01</span>
          <h2>CHAMPIONS<br />CAMPAIGN</h2>
          <div className="campaign-stage"><div className="k">Objective</div><div className="v">Drive hype around a sportswear brand's Champions collection ahead of tournament season.</div></div>
          <div className="campaign-stage"><div className="k">Creative Direction</div><div className="v">Bold numerals, scoreboard-inspired type, high-contrast athlete photography.</div></div>
          <div className="campaign-stage"><div className="k">Photography / Video</div><div className="v">On-site athlete shoots plus a 30s hype edit for launch day.</div></div>
          <div className="campaign-stage"><div className="k">Graphics</div><div className="v">A full post system — announcement, countdown, and results templates.</div></div>
          <div className="campaign-stage"><div className="k">Results</div><div className="v">Highest campaign engagement of the season across the brand's channels.</div></div>

          <div className="campaign-rf">
            <RawFinalToggle
              labels={['Planning', 'Published']}
              stageStyle={{ aspectRatio: '4/5', maxWidth: 260, marginTop: 12 }}
              raw={<Placeholder label="CONTENT CALENDAR / PLANNING" />}
              final={<Placeholder label="PUBLISHED POST" />}
            />
          </div>
        </div>
        <div className="campaign-phones">
          <div className="phone tilt-1"><div className="screen"><Placeholder label="FEED POST" /></div></div>
          <div className="phone tilt-2"><div className="screen"><Placeholder label="STORY / REEL" /></div></div>
        </div>
      </Reveal>

      <Reveal as="article" className="campaign reverse">
        <div className="campaign-text">
          <span className="tag">CAMPAIGN 02</span>
          <h2>JAMAICA DAY</h2>
          <div className="campaign-stage"><div className="k">Objective</div><div className="v">Celebrate Jamaica Day across in-store and social without leaning on cliché flag graphics.</div></div>
          <div className="campaign-stage"><div className="k">Creative Direction</div><div className="v">A colour system pulled from the flag, extended into pattern and motion.</div></div>
          <div className="campaign-stage"><div className="k">Photography / Video</div><div className="v">In-store event coverage cut into a same-day recap reel.</div></div>
          <div className="campaign-stage"><div className="k">Graphics</div><div className="v">Carousel series introducing the campaign colour system.</div></div>
          <div className="campaign-stage"><div className="k">Results</div><div className="v">Strongest single-day story completion rate of the year.</div></div>
        </div>
        <div className="campaign-phones">
          <div className="phone tilt-2"><div className="screen"><Placeholder label="CAROUSEL SLIDE 1" /></div></div>
          <div className="phone tilt-1"><div className="screen"><Placeholder label="REEL PREVIEW" /></div></div>
        </div>
      </Reveal>

      <Reveal as="article" className="campaign">
        <div className="campaign-text">
          <span className="tag">CAMPAIGN 03</span>
          <h2>SCHOOL IG<br />TAKEOVER</h2>
          <div className="campaign-stage"><div className="k">Objective</div><div className="v">Keep the high school's Instagram active, current, and student-run.</div></div>
          <div className="campaign-stage"><div className="k">Creative Direction</div><div className="v">A friendly, energetic template system built for a fast weekly cadence.</div></div>
          <div className="campaign-stage"><div className="k">Photography / Video</div><div className="v">Event photography and quick recap edits after every school activity.</div></div>
          <div className="campaign-stage"><div className="k">Graphics</div><div className="v">Announcement, spirit-week, and results templates.</div></div>
          <div className="campaign-stage"><div className="k">Results</div><div className="v">Where it all started — the first proof that this could be a practice, not a hobby.</div></div>
        </div>
        <div className="campaign-phones">
          <div className="phone tilt-1"><div className="screen"><Placeholder label="ANNOUNCEMENT POST" /></div></div>
          <div className="phone tilt-2"><div className="screen"><Placeholder label="EVENT RECAP" /></div></div>
        </div>
      </Reveal>

      <NextArchive />
      <Footer />
    </PageFade>
  );
}
