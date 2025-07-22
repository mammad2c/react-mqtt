import { render } from "@/shared/tests/test-utils";
import { hiveMQClient as client, useTopics } from ".";
import { waitFor } from "@testing-library/dom";
import { delay } from "msw";

vi.mock("mqtt");

function TestComponent() {
  const { subscribeTopic, unsubscribeTopic, state } = useTopics();

  function handleSubscribeTopic() {
    subscribeTopic("test/topic");
  }

  return (
    <div>
      <button onClick={handleSubscribeTopic}>Subscribe</button>

      <div>
        <p>Subscribed Topics:</p>
        <ul>
          {state.subscriptions.map((sub, index) => (
            <li key={index}>
              {sub.topic} (QoS: {sub.qos})
              <button onClick={() => unsubscribeTopic(sub.topic)}>
                Unsubscribe
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

describe("useTopics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    client.end();
  });

  it("should subscribe and unsubscribe to topics", async () => {
    client.connect();

    await delay(300);

    // Arrange
    const { getByText, user, queryByText } = render(<TestComponent />);

    // Act
    await user.click(getByText("Subscribe"));

    // Assert
    await waitFor(() =>
      expect(getByText("test/topic (QoS: 0)")).toBeInTheDocument(),
    );

    // Act
    await user.click(getByText("Unsubscribe"));

    // Assert
    await waitFor(() => expect(queryByText("test/topic (QoS: 0)")).toBeNull());
  });

  it("should not subscribe to the same topic twice", async () => {
    client.connect();

    await delay(300);

    // Arrange
    const { getByText, user } = render(<TestComponent />);

    // Act
    await user.click(getByText("Subscribe"));
    await user.click(getByText("Subscribe"));

    // Assert
    await waitFor(() =>
      expect(getByText("Already Subscribed")).toBeInTheDocument(),
    );
  });
});
