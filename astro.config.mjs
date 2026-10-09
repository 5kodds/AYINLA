import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set SITE_URL to the approved production domain once it is known.
  site: process.env.SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
