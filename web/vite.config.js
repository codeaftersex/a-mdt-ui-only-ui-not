import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The studio reserves a unique port per session via the PORT env var
// (see app/api/chat/route.ts). vite honours PORT automatically — no
// need to hard-code it here.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    strictPort: false,
  },
});
