// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Add site URL for i18n helper functions
  site: 'https://brandlift.pe',

  i18n: {
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routing: {
          prefixDefaultLocale: false
      }
	},

  integrations: [
      tailwind(),
	],

  adapter: netlify(),
});