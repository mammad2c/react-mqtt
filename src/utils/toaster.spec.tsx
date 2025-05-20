import { toaster } from "./toaster";
import { render } from "@/tests/test-utils";
import { waitFor } from "@testing-library/react";
import { useEffect } from "react";

function TestComponent() {
  function createToast() {
    toaster.create({
      title: "Toast Title",
      description: "Toast Description",
    });
  }

  useEffect(() => {
    const id = setTimeout(() => {
      createToast();
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div>
      <h1>A test component</h1>
    </div>
  );
}

describe("toaster", () => {
  it("should show a toast", async () => {
    // Arrange
    const { queryByText } = render(<TestComponent />);

    // Act

    // Assert
    await waitFor(() => expect(queryByText(/Toast Title/i)).toBeVisible());
    await waitFor(() =>
      expect(queryByText(/Toast Description/i)).toBeVisible(),
    );
  });
});
