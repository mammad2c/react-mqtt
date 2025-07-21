"use client";

import {
  ChakraProvider as ChakraDefaultProvider,
  defaultSystem,
} from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode-provider";

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraDefaultProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraDefaultProvider>
  );
}
