// Labeled placeholder block for media not yet swapped in.
// Pass `src` once a real image/video exists to render it instead.
export default function Placeholder({ label, dark = false, src, alt = '', className = '', style, ...rest }) {
  if (src) {
    return <img src={src} alt={alt} className={className} style={style} {...rest} />;
  }
  return (
    <div className={`ph${dark ? ' ph-dark' : ''} ${className}`.trim()} data-ph={label} style={style} {...rest} />
  );
}
