import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: process.env.NODE_ENV !== "CI",
      filename: "./dist/stats.html",
    }),
  ],
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3000,
    host: true,
  },
  base: "./",
  esbuild: {
    keepNames: true,
  },
  build: {
    sourcemap: true,
  },
});
