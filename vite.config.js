import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
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

export default defineConfig(() => {
  return {
    plugins: [jsxInJsPlugin, react(), tailwindcss()],
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
