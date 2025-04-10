import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// https://vite.dev/config/
export default defineConfig({
  // Test comment
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(dirName, './src'),
    },
  },
});
