import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/static/', // Match Django's STATIC_URL
  build: { outDir: 'dist' },
});