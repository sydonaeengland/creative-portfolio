import PageFade from '../components/PageFade.jsx';
import Reveal from '../components/Reveal.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/contact.css';

export default function Contact() {
  return (
    <PageFade>
      <section className="contact-hero purple-field on-purple">
        <Reveal as="p" className="kicker">YOU'VE REACHED THE END.</Reveal>
        <Reveal as="h1" className="display">
          LET'S MAKE SOMETHING<br />WORTH LOOKING AT.
        </Reveal>

        <Reveal className="contact-links">
          <a href="mailto:hello@sydigitalstudios.com">hello@sydigitalstudios.com</a>
          <a href="https://instagram.com/sydigitalstudios" target="_blank" rel="noopener noreferrer">@sydigitalstudios</a>
          <a href="https://linkedin.com/in/sydonaeengland" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </Reveal>

        <Reveal as="p" className="available-line">AVAILABLE FOR GOOD IDEAS.</Reveal>
      </section>

      <Footer />
    </PageFade>
  );
}
