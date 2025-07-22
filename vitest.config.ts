import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

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
        statements: 50,
        functions: 50,
        lines: 50,
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
          setupFiles: ["src/shared/tests/setup.ts"],
        },
      },
    ],
  },
});
