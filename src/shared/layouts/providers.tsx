import { ChakraProvider } from "@/shared/ui/chakra-provider";
import { Toaster } from "@/shared/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Toaster />
      {children}
    </ChakraProvider>
  );
}
