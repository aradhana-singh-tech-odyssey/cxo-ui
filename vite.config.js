import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      babel: {
        presets: ['@babel/preset-react']
      }
    }),
    federation({
      name: 'cxoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Auth': './src/context/AuthContext.js',
        './useAuth': './src/hooks/useAuth.js',
        './Login': './src/pages/Login.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});