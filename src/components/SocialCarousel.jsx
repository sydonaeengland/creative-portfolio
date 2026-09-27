import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Placeholder from './Placeholder.jsx';

// Auto-advancing carousel — cycles through a handful of real Instagram
// grid screenshots so the page shows off actual managed accounts without
// cramming every shot on screen at once.
export default function SocialCarousel({ items, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  const current = items[index];

  return (
    <div className="social-carousel">
      <div className="social-carousel-frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            className="social-carousel-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Placeholder label={current.label} src={current.src} alt={current.alt} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="social-carousel-dots">
        {items.map((item, i) => (
          <button
            key={item.src}
            className={`social-carousel-dot${i === index ? ' is-active' : ''}`}
            aria-label={`Show ${item.label}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
