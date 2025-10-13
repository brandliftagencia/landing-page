// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify/functions';

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
  output: 'server',
  adapter: netlify(),

  // Environment variable schema for better error handling
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});