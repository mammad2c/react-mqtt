import { ChakraProvider } from "./chakra-provider";
import { Toaster } from "@/shared/ui/toaster";

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Toaster />
      {children}
    </ChakraProvider>
  );
}
