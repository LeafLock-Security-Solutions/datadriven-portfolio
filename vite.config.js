import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// Read version from package.json
const packageJson = JSON.parse(readFileSync(resolve(dirName, 'package.json'), 'utf-8'));

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  envPrefix: 'DDP_',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(dirName, './src'),
    },
  },
});
