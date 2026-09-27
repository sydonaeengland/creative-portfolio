// Plain page wrapper — no transition animation between routes. Kept as its
// own component so page files don't need to change if this ever needs to
// wrap children in something again.
export default function PageFade({ children }) {
  return <main>{children}</main>;
}
