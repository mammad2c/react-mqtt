import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/home.tsx"),
  route("/hive-mq", "./pages/hive-mq.tsx"),
] satisfies RouteConfig;
