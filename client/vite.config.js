/* eslint-disable */
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { loadEnv, defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr'; // for svg as a ReactComponent

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // tell vite how to build import path
      },
    },
    server: {
      open: true,
      port: 3000,
      // proxy: {
      //   '/eda/master/web/api': {
      //     target: 'http://10.136.217.103:80',
      //     changeOrigin: true,
      //   },
      //   '/eda/web/api': {
      //     target: 'http://10.136.217.103:80',
      //     changeOrigin: true,
      //   },
      // },
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
    build: {
      outDir: 'build',
    },
    plugins: [react(), svgr()],
  });
};
