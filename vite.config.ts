import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // 백엔드 FastAPI 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 제거
      },
    },
  },
});
