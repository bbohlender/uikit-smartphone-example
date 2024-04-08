import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  base: "/uikit-smartphone-example",
  build: {
    outDir: "dist",
    target: "esnext",
  },
});
