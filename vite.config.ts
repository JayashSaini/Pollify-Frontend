// vite.config.js
import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
dns.setDefaultResultOrder("verbatim");

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URI,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
