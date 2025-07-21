import { type PropsWithChildren, type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Providers } from "@/shared/layouts/providers";
import userEvent from "@testing-library/user-event";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }: PropsWithChildren) => (
        <Providers>{children}</Providers>
      ),
      ...options,
    }),
  };
};

export { customRender as render };
