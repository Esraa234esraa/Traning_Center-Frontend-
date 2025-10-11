import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://traning-center.runasp.net", // أو http://localhost:5000 لو محلي
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      external: ["react-select"], // ✅ استبعاد المكتبة نفسها مش ملف CSS
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "lodash"],
        },
      },
    },
  },
});
