import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom",
  pauseOnPageIdle: true,
  max: 3,
});
