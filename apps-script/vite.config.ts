import { resolve } from "node:path";
import { defineConfig } from "vite";

// Builds PhoneValidation.js, a single classic script Apps Script can load as a .gs file.
export default defineConfig({
  root: resolve(import.meta.dirname, ".."),
  publicDir: false,
  build: {
    outDir: import.meta.dirname,
    emptyOutDir: false,
    target: "es2019",
    lib: {
      entry: resolve(import.meta.dirname, "phoneValidation.entry.ts"),
      formats: ["iife"],
      name: "PhoneValidation",
      fileName: () => "PhoneValidation.js",
    },
  },
});
