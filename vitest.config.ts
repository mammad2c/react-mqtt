import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/e2e/**",
        "src/pages/**/*.page.{tsx,ts}",
      ],
      thresholds: {
        statements: 80,
        functions: 80,
        lines: 80,
      },
    },
    projects: [
      {
        plugins: [tsconfigPaths(), react()],
        test: {
          name: "unit",
          globals: true,
          exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**"],
          environment: "jsdom",
          browser: {
            enabled: false,
          },
          setupFiles: ["src/tests/setup.ts"],
        },
      },
    ],
  },
});
