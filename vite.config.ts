import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
  server: {
    host: true,
    port: 3000,
    warmup: {
      clientFiles: [
        "./src/pages/**/!(*.server|*.test)*.tsx", // Include all .tsx files except server and test files (add more patterns if required)
      ],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
  },
});
