import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pre-transform plugin so that all .js files containing JSX syntax compile seamlessly
const jsxInJsPlugin = {
  name: 'jsx-in-js',
  enforce: 'pre',
  transform(code, id) {
    if (id.endsWith('.js') && !id.includes('node_modules')) {
      return esbuild.transformSync(code, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    }
  },
};

// Plugin to serve sw.js with application/javascript and Service-Worker-Allowed header
const serveServiceWorkerPlugin = {
  name: 'serve-sw-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0];
      
      if (url === '/sw.js') {
        const swPath = path.resolve(__dirname, 'public/sw.js');
        if (fs.existsSync(swPath)) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Service-Worker-Allowed', '/');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(fs.readFileSync(swPath));
          return;
        }
      }
      
      if (url === '/manifest.json' || url === '/manifest.webmanifest') {
        const manifestPath = path.resolve(__dirname, 'public/manifest.json');
        if (fs.existsSync(manifestPath)) {
          res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache');
          res.end(fs.readFileSync(manifestPath));
          return;
        }
      }
      
      next();
    });
  }
};

export default defineConfig(() => {
  return {
    plugins: [
      jsxInJsPlugin, 
      serveServiceWorkerPlugin,
      react(), 
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
