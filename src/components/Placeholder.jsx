import { useEffect, useRef, useState } from 'react';

// Labeled placeholder block for media not yet swapped in.
// Pass `src` once a real image/video exists to render it instead — real
// images fade in on load rather than popping in abruptly once decoded.
export default function Placeholder({ label, dark = false, src, alt = '', className = '', style, onLoad, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  if (src) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={() => setLoaded(true)}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(.16,1,.3,1)',
        }}
        {...rest}
      />
    );
  }
  return (
    <div className={`ph${dark ? ' ph-dark' : ''} ${className}`.trim()} data-ph={label} style={style} {...rest} />
  );
}
