import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
    base: "./",
  plugins: [react()],
  server:{
     proxy: {
      '/api': {
        target: 'http://traning-center.runasp.net',
        changeOrigin: true,
        secure: false,
      },
  }
  } 
});
