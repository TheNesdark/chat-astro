// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react({
    experimentalReactChildren: false,
  })],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    build: {
      rollupOptions: {
        external: [],
        output: {
          manualChunks: undefined,
        }
      },
      commonjsOptions: {
        include: [/src/, /node_modules/]
      }
    },
    optimizeDeps: {
      include: [
        'socket.io-client',
        'react',
        'react-dom'
      ]
    }
  }
});