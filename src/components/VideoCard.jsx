import { useRef, useState } from 'react';
import Placeholder from './Placeholder.jsx';

// Video card with editing-language UI texture. Hover scrubs a fill bar
// (and, once real <video> assets are wired in, would scrub currentTime —
// see the commented block below for that swap).
export default function VideoCard({ cutLabel, label, filename }) {
  const wrapRef = useRef(null);
  const [scrub, setScrub] = useState(0);

  function handleMouseMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setScrub(pct * 100);
  }

  return (
    <article className="video-card" data-cursor="PLAY ▶" ref={wrapRef} onMouseMove={handleMouseMove}>
      <div className="cut-label">{cutLabel}</div>
      <div className="stage">
        <Placeholder label={label} dark />
        <div className="scrub-bar"><div className="scrub-fill" style={{ width: `${scrub}%` }} /></div>
      </div>
      <div className="ui-row">
        <span className="play">PLAY ▶</span>
        <span className="filename">{filename}</span>
      </div>
    </article>
  );
}
