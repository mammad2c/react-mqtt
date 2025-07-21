import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

// We have to customize some FSD rules because of next.js page router
export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["./src/**"],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
    },
  },
  {
    files: ["./src/pages/**"],
    rules: {
      "fsd/no-layer-public-api": "off",
      "fsd/no-public-api-sidestep": "off",
    },
  },
]);
