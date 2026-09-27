import PageFade from '../components/PageFade.jsx';
import NextArchive from '../components/NextArchive.jsx';
import Footer from '../components/Footer.jsx';
import JourneyPreview from '../components/JourneyPreview.jsx';
import '../styles/journey.css';

export default function Journey() {
  return (
    <PageFade>
      <JourneyPreview />

      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <NextArchive />
      </div>

      <Footer />
    </PageFade>
  );
}
