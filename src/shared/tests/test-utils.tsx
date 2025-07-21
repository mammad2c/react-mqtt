import { type PropsWithChildren, type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DefaultLayout } from "@/shared/layouts/default-layout";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }: PropsWithChildren) => (
        <DefaultLayout>{children}</DefaultLayout>
      ),
      ...options,
    }),
  };
};

export { customRender as render };
