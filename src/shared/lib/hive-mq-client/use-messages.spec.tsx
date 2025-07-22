import { render } from "@/shared/tests/test-utils";
import { hiveMQClient as client, useMessages } from ".";
import { waitFor } from "@testing-library/dom";
import { delay } from "msw";

vi.mock("mqtt");

function TestComponent() {
  const { messages } = useMessages();

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <div>Topic: {msg.topic}</div>
            <div>QoS: {msg.qos}</div>
            <div>Message: {msg.message.toString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("useMessages", () => {
  beforeEach(() => {
    client.end();
  });

  it("should render messages", async () => {
    client.connect();

    await delay(300);

    // Arrange
    const { getByText } = render(<TestComponent />);

    // Act
    await waitFor(async () => {
      await client.subscribeAsync("test/topic", { qos: 0 });
      await client.publishAsync("test/topic", "test message");
    });

    // Assert
    await waitFor(() => expect(getByText(/test\/topic/i)).toBeInTheDocument());
  });
});
