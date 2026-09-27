// Central route/section registry — used by Nav, MobileMenu, and each page's
// "Next Archive" footer link so the numbered system stays consistent.
export const SECTIONS = [
  { num: '00', short: 'HOME', full: 'Home', path: '/' },
  { num: '01', short: 'DESIGN', full: 'Design', path: '/design' },
  { num: '02', short: 'PHOTO', full: 'Photo', path: '/photography' },
  { num: '03', short: 'VIDEOGRAPHY', full: 'Videography', path: '/video-editing' },
  { num: '04', short: 'SOCIAL MEDIA', full: 'Social Media', path: '/social' },
];

export function nextSection(path) {
  const i = SECTIONS.findIndex((s) => s.path === path);
  return SECTIONS[(i + 1) % SECTIONS.length];
}
