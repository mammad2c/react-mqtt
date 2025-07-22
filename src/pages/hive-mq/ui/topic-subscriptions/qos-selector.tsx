import { NativeSelect } from "@chakra-ui/react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type QoSSelectorProps = ComponentPropsWithoutRef<"select">;

export const QoSSelector = forwardRef<HTMLSelectElement, QoSSelectorProps>(
  ({ children, ...props }, ref) => (
    <NativeSelect.Root>
      <NativeSelect.Field ref={ref} {...props}>
        {children ?? (
          <>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </>
        )}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  ),
);

QoSSelector.displayName = "QoSSelector";
