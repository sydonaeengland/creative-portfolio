import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import Placeholder from './Placeholder.jsx';

// Flickr/Google-Photos style justified gallery: groups images into rows
// aiming for `targetHeight`, then scales each row (including the last) so
// it exactly fills the container's full width — no cropping, no gaps,
// every row flush on both ends.
function layoutRows(items, containerWidth, targetHeight, gap) {
  const rows = [];
  let row = [];
  let rowWidth = 0;

  for (const item of items) {
    const ratio = item.ratio || 1;
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

  const MAX_SCALE = 1.35; // cap how tall a sparse last row is allowed to grow

  return rows.map((r) => {
    const totalGap = gap * (r.length - 1);
    const naturalWidth = r.reduce((sum, it) => sum + it.width, 0);
    const idealScale = (containerWidth - totalGap) / naturalWidth;
    const scale = Math.min(idealScale, MAX_SCALE);
    const scaledWidth = naturalWidth * scale;
    const leftoverWidth = containerWidth - totalGap - scaledWidth;
    // If the scale got capped, the row would fall short of the full width —
    // spread the remainder evenly across every tile so the row still ends
    // flush on both edges (a touch of extra crop via object-fit: cover,
    // rather than leaving a gap on the right).
    const extraPerItem = leftoverWidth > 0 ? leftoverWidth / r.length : 0;
    return r.map((it) => ({
      ...it,
      width: it.width * scale + extraPerItem,
      height: targetHeight * scale,
    }));
  });
}

// Loads every item's real image dimensions up front (in parallel, from
// cache where possible) before anything is laid out or shown. This trades
// a brief blank pause for zero visible reflow afterward — rows are only
// ever rendered once, already correctly sized, instead of rendering with
// guessed ratios and reshuffling as real ones arrive. That incremental
// reshuffle was the visible "glitch" on entering an album, which is a
// genuine photosensitivity concern, not just a cosmetic one.
function useImageRatios(items) {
  const [ratios, setRatios] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setRatios(null);

    Promise.all(
      items.map(
        (item) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve([item.id, img.naturalWidth / img.naturalHeight || 1]);
            img.onerror = () => resolve([item.id, 1]);
            img.src = item.image;
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

export default function JustifiedGallery({ items, targetHeight = 240, gap = 14, onSelect }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const ratios = useImageRatios(items);

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
        items.map((it) => ({ ...it, ratio: ratios[it.id] || 0.8 })),
        width,
        targetHeight,
        gap,
      )
    : [];

  return (
    <div className="justified-gallery" ref={containerRef}>
      {!ready && (
        <div className="gallery-loading" role="status" aria-live="polite">
          <svg className="gallery-loading-icon" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="14" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>Developing the roll…</span>
        </div>
      )}
      {ready && rows.map((row, ri) => (
        <div className="justified-row" key={ri} style={{ gap }}>
          {row.map((item, ci) => (
            <Reveal
              key={item.id}
              as="article"
              className="justified-card"
              variant="scale"
              delay={(ci % 5) * 0.06}
              style={{ width: item.width, height: item.height }}
            >
              <button
                type="button"
                className="frame"
                onClick={() => onSelect(item)}
              >
                <Placeholder label={item.label} src={item.image} alt={item.label} />
                <span className="poster-card-hover">VIEW ↗</span>
              </button>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
