/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react({}), tailwindcss()],
  base: mode === "production" ? "/typing-speed-test/" : "",
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
      "@tests": resolve(import.meta.dirname, "./tests"),
    },
  },
  build: {
    rollupOptions: {
      input: ["index.html", "404.html"],
    },
  },
  test: {
    environment: "happy-dom",
    setupFiles: "./tests/vitest/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html", "json-summary"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
}));
