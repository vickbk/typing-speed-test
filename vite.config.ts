/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  base: mode === "production" ? "/typing-speed-test/" : "",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve("./src/assets"),
      "@components": resolve("./src/components"),
    },
  },
  build: {
    rollupOptions: {
      input: ["index.html", "404.html"],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
}));
