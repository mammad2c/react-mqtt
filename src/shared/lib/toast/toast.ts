import { createToaster } from "@chakra-ui/react";

export const toast = createToaster({
  placement: "bottom",
  pauseOnPageIdle: true,
  max: 3,
});
