import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx']
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
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  build: {
    target: 'esnext',
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3002,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});