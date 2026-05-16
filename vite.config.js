import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/build-simple-full-stack-application-regarding-iden/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
