import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  appDirectory: "src",
  future: {
    unstable_optimizeDeps: false,
  },
} satisfies Config;
