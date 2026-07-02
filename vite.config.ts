import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { spawnSync } from "node:child_process";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";


// Fails the production build if any t() key is missing from a locale file
// or if a hardcoded English UI string is detected. See scripts/i18n-check.mjs.
const i18nCheckPlugin = () => ({
  name: "i18n-check",
  apply: "build" as const,
  buildStart() {
    const result = spawnSync(
      process.execPath,
      [path.resolve(__dirname, "scripts/i18n-check.mjs")],
      { stdio: "inherit" },
    );
    if (result.status !== 0) {
      throw new Error("i18n-check failed — see report above.");
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && i18nCheckPlugin(),
    mcpPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

