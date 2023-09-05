import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
const env = loadEnv("", "./");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
