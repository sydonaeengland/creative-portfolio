// The app is served under Vite's `base: '/creative-portfolio/'` (see
// vite.config.js) and React Router's basename matches it, so every in-app
// route is actually reachable at /creative-portfolio/<route>, not /<route>.
const BASE = '/creative-portfolio';

// For navigation (goto) we want the trailing slash so Vite's dev server
// resolves the base path correctly. For assertions (toHaveURL) React
// Router's <Link to="/"> with a basename lands on the bare basename with
// no trailing slash, so home must be matched without one.
export function appUrl(path: string): string {
  if (path === '/') return `${BASE}/`;
  return `${BASE}${path}`;
}

export function appUrlPattern(path: string): RegExp {
  if (path === '/') return new RegExp(`${BASE}/?$`);
  return new RegExp(`${BASE}${path}$`);
}
