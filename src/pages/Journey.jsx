import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/journey.css';

export default function Journey() {
  return (
    <PageFade>
      <section className="journey-intro">
        <Reveal as="p" className="eyebrow">01 / JOURNEY</Reveal>
        <Reveal as="h1" className="display">
          IT DIDN'T START<br />WITH A PORTFOLIO.
        </Reveal>
        <Reveal as="p">
          It started with a laptop, a school Instagram account, and a
          willingness to figure things out. Here's how one interest turned into four.
        </Reveal>
      </section>

      <section className="journey-track">
        <svg className="journey-line-svg" viewBox="0 0 200 2400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100,0 C 40,150 160,300 100,450 C 40,600 160,750 100,900 C 40,1050 160,1200 100,1350 C 40,1500 160,1650 100,1800 C 40,1950 160,2100 100,2250 L100,2400" />
        </svg>

        <span className="year-marker" style={{ top: '20px' }}>2020</span>

        <Reveal as="article" className="milestone v-giant">
          <span className="tag">2020 — WHERE IT STARTED</span>
          <h2 className="headline">
            TAUGHT MYSELF DESIGN<br />BECAUSE I HAD IDEAS<br />AND NO ONE TO MAKE THEM.
          </h2>
          <p>Late nights with free software and free tutorials — the beginning of
            a design habit that never really stopped.</p>
        </Reveal>

        <span className="year-marker" style={{ top: '640px' }}>2021</span>

        <Reveal as="article" className="milestone v-taped">
          <div className="photo">
            <Placeholder label="SCHOOL IG — GRAPHIC" />
          </div>
          <div className="text">
            <span className="tag">2021 — HIGH SCHOOL</span>
            <h3>RUNNING THE SCHOOL'S INSTAGRAM</h3>
            <p>Graphics for school activities, quick video edits, event photography —
              the first time design had a real audience and a real deadline.</p>
          </div>
        </Reveal>

        <Reveal as="article" className="milestone v-annotation">
          <span className="tag">STILL 2021</span>
          <h3>EVERY POST WAS PRACTICE</h3>
          <p>Announcement graphics, event recaps, the occasional meme — learning
            what actually gets people to stop scrolling.</p>
        </Reveal>

        <span className="year-marker" style={{ top: '1180px' }}>2022</span>

        <Reveal as="article" className="milestone v-scatter">
          <span className="tag">2022 — SPORTS ACADEMY</span>
          <h3>ATHLETE PHOTOGRAPHY &amp; EVENT COVERAGE</h3>
          <div className="grid">
            <Placeholder label="ATHLETE PORTRAIT" />
            <Placeholder label="TOURNAMENT GRAPHIC" />
            <Placeholder label="EVENT PHOTO" />
            <Placeholder label="RESULTS GRAPHIC" />
          </div>
          <p>Sidelines, trophy shots, tournament graphics on tight turnaround —
            photography under pressure, and loving it.</p>
        </Reveal>

        <span className="year-marker" style={{ top: '1560px' }}>2023</span>

        <Reveal as="article" className="milestone v-taped">
          <div className="photo">
            <Placeholder label="CHAMPIONS CAMPAIGN" />
          </div>
          <div className="text">
            <span className="tag">2023 — SPORTSWEAR BRAND</span>
            <h3>CHAMPIONS &amp; JAMAICA DAY CAMPAIGNS</h3>
            <p>Campaign videos, event content, and the Jamaica Day push — the first
              time design, photo and video had to work together on purpose.</p>
          </div>
        </Reveal>

        <span className="year-marker" style={{ top: '2020px' }}>2024</span>

        <Reveal as="article" className="milestone v-annotation">
          <span className="tag">2024 — AIRBNB</span>
          <h3>GRAPHICS &amp; VIDEO FOR BOOKINGS</h3>
          <p>Listing visuals and short-form video built to convert — creative
            with a measurable job to do.</p>
        </Reveal>

        <span className="year-marker" style={{ top: '2280px' }}>2025–26</span>

        <Reveal as="article" className="milestone v-giant">
          <span className="tag">2025–2026 — UWI</span>
          <h2 className="headline">
            PUBLICATIONS CHAIRPERSON,<br />COMPUTING SUBCOMMITTEE
          </h2>
          <p>Leading publications for a whole subcommittee — the design, photo,
            video and social instincts finally under one roof.</p>
        </Reveal>
      </section>

      <section className="journey-outro">
        <Reveal as="p" className="line1 display">
          AND THEN EVERYTHING<br />STARTED CONNECTING.
        </Reveal>
        <Reveal as="p" className="chain">DESIGN → PHOTO → VIDEO → SOCIAL</Reveal>
      </section>

      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <NextArchive />
      </div>

      <Footer />
    </PageFade>
  );
}
