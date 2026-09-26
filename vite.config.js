import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Don't watch public/assets — it's static media dropped in from the
    // filesystem (sometimes mid-sync from a cloud client), and watching it
    // has crashed the dev server (EBUSY) when a file is briefly locked.
    // These are served as-is and never need hot-reload watching anyway.
    watch: {
      ignored: ['**/public/assets/**'],
    },
  },
});
