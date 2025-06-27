import { defineConfig, type UserConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import { fileURLToPath } from "node:url";

const config: UserConfig = defineConfig({
  plugins: [vue2()],
  resolve: {
    extensions: [".js", ".ts", ".json", ".vue"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

export default config;
