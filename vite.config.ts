import { defineConfig, loadEnv } from "vite";
import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";
const env = loadEnv("", "./");

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
    port: parseInt(env.VITE_PORT),
    host: true,
  },
  preview: {
    port: parseInt(env.VITE_PORT),
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
