import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  base: "/typing-speed-test/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve("./src/assets"),
    },
  },
});
