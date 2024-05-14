import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import alias from "@rollup/plugin-alias";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
const customResolver = {
  entries: [{ find: "~", replacement: "./node_modules" }],
};

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tsconfigPaths(), alias(customResolver)],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  });
};

/*
export default defineConfig({
  plugins: [react(), legacy(), tsconfigPaths(), alias(customResolver)],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});

*/
