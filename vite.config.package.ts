import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/library/index.ts"),
      cssFileName: "disin",
      fileName: "disin",
      formats: ["es"],
      name: "Disin",
    },
    outDir: "package-dist",
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: "disin.js",
      },
    },
  },
});
