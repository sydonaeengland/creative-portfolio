import { useRef, useState } from 'react';

function formatDuration(seconds) {
  if (!seconds || !Number.isFinite(seconds)) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Video tile: click to play/pause, mute toggle, duration badge, and a
// YouTube-style progress bar (draggable to seek) along the bottom edge.
// Muted by default so multiple tiles can autoplay-safely without
// competing audio.
export default function VideoCard({ src }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [seeking, setSeeking] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute(e) {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress(video.currentTime / video.duration);
  }

  function seekFromEvent(e) {
    const bar = barRef.current;
    const video = videoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    video.currentTime = pct * video.duration;
    setProgress(pct);
  }

  function handleScrubStart(e) {
    e.stopPropagation();
    setSeeking(true);
    seekFromEvent(e);
    const onMove = (ev) => seekFromEvent(ev);
    const onUp = () => {
      setSeeking(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  return (
    <div className="video-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        className="video-card-el"
        muted={muted}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={handleTimeUpdate}
        playsInline
        preload="metadata"
      />
      {!playing && (
        <span className="video-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
      )}
      {duration > 0 && <span className="video-duration">{formatDuration(duration)}</span>}
      <button
        className="video-mute-btn"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.74 2.5-2.26 2.5-4.03zM4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a4.5 4.5 0 0 0-1.7-3.53v7.06A4.5 4.5 0 0 0 15.5 12zm3-8-1.41 1.41A8.98 8.98 0 0 1 20 12a8.98 8.98 0 0 1-2.91 6.59L18.5 20A10.98 10.98 0 0 0 22 12a10.98 10.98 0 0 0-3.5-8z" fill="currentColor" />
          </svg>
        )}
      </button>
      <div
        className={`video-progress${seeking ? ' is-seeking' : ''}`}
        ref={barRef}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handleScrubStart}
      >
        <div className="video-progress-fill" style={{ width: `${progress * 100}%` }} />
        <div className="video-progress-handle" style={{ left: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
