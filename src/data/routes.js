// Central route/section registry — used by Nav, MobileMenu, and each page's
// "Next Archive" footer link so the numbered system stays consistent.
export const SECTIONS = [
  { num: '00', short: 'HOME', full: 'Home', path: '/' },
  { num: '01', short: 'JOURNEY', full: 'Journey', path: '/journey' },
  { num: '02', short: 'DESIGN', full: 'Design', path: '/design' },
  { num: '03', short: 'PHOTO', full: 'Photo', path: '/photography' },
  { num: '04', short: 'VIDEO', full: 'Video Editing', path: '/video-editing' },
  { num: '05', short: 'SOCIAL', full: 'Social', path: '/social' },
  { num: '06', short: 'CONTACT', full: 'Contact', path: '/contact' },
];

export function nextSection(path) {
  const i = SECTIONS.findIndex((s) => s.path === path);
  return SECTIONS[(i + 1) % SECTIONS.length];
}
