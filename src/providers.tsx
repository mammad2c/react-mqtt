import { ChakraProvider } from "@/components/ui/chakra-provider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Toaster />
      {children}
    </ChakraProvider>
  );
}
