import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import VideoCard from './VideoCard.jsx';

// Same justified-row technique as JustifiedGallery (photos): each video's
// tile is sized to its own real aspect ratio — a portrait phone clip and a
// landscape clip sit at their true proportions in the same row, none of
// them cropped or forced into a uniform box.
function layoutRows(items, containerWidth, targetHeight, gap) {
  const rows = [];
  let row = [];
  let rowWidth = 0;

  for (const item of items) {
    const ratio = item.ratio || 16 / 9;
    const width = targetHeight * ratio;
    if (row.length > 0 && rowWidth + width + gap * row.length > containerWidth) {
      rows.push(row);
      row = [];
      rowWidth = 0;
    }
    row.push({ ...item, width });
    rowWidth += width;
  }
  if (row.length) rows.push(row);

  const MAX_SCALE = 1.35;

  return rows.map((r) => {
    const totalGap = gap * (r.length - 1);
    const naturalWidth = r.reduce((sum, it) => sum + it.width, 0);
    const idealScale = (containerWidth - totalGap) / naturalWidth;
    const scale = Math.min(idealScale, MAX_SCALE);
    // No leftover-width stretch: a tile's box always matches its video's
    // real aspect ratio exactly (just scaled), so `object-fit: contain`
    // never has a size mismatch to letterbox — that mismatch is what was
    // showing as a visible background sliver behind sparse/small rows.
    return r.map((it) => ({
      ...it,
      width: it.width * scale,
      height: targetHeight * scale,
    }));
  });
}

// Loads every clip's real width/height up front (via a throwaway <video>
// element reading loadedmetadata) before anything is laid out — avoids
// rendering with a guessed ratio and reshuffling once real ones arrive,
// which is visible reflow/glitching during load.
function useVideoRatios(items) {
  const [ratios, setRatios] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setRatios(null);

    Promise.all(
      items.map(
        (item) =>
          new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
              resolve([item.src, (video.videoWidth / video.videoHeight) || 16 / 9]);
            };
            video.onerror = () => resolve([item.src, 16 / 9]);
            video.src = item.src;
          }),
      ),
    ).then((pairs) => {
      if (cancelled) return;
      setRatios(Object.fromEntries(pairs));
    });

    return () => { cancelled = true; };
  }, [items]);

  return ratios;
}

export default function VideoJustifiedGallery({ items, targetHeight = 260, gap = 16 }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const ratios = useVideoRatios(items);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = width > 0 && ratios !== null;
  const rows = ready
    ? layoutRows(
        items.map((it) => ({ ...it, ratio: ratios[it.src] || 16 / 9 })),
        width,
        targetHeight,
        gap,
      )
    : [];

  return (
    <div className="video-justified-gallery" ref={containerRef}>
      {!ready && (
        <div className="gallery-loading" role="status" aria-live="polite">
          <svg className="gallery-loading-icon" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <path d="M3 9.5 4.6 5h2.6L5.6 9.5H3zm5 0L9.6 5h2.6L10.6 9.5H8zm5 0L14.6 5h2.6L15.6 9.5H13zm5 0L19.6 5H21v4.5h-3z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <rect x="3" y="9.5" width="18" height="9.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>Cutting the reel…</span>
        </div>
      )}
      {ready && rows.map((row, ri) => (
        <div className="video-justified-row" key={ri} style={{ gap }}>
          {row.map((item) => (
            <Reveal key={item.src} style={{ width: item.width, height: item.height }}>
              <VideoCard {...item} />
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
