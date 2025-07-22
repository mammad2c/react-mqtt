import { render } from "@/shared/tests/test-utils";
import { useConnection, hiveMQClient as client } from ".";
import { waitFor } from "@testing-library/dom";

vi.mock("mqtt");

function TestComponent() {
  const { connect, disconnect, isConnected, isDisconnected, isConnecting } =
    useConnection();

  return (
    <div>
      <button
        onClick={() => {
          connect({
            username: "test",
            password: "test",
            host: "localhost",
            port: 8884,
          });
        }}
      >
        Connect
      </button>
      <button onClick={disconnect}>Disconnect</button>
      <div>
        <p>Connection Status:</p>
        <ul>
          <li>Connected: {isConnected ? "Yes" : "No"}</li>
          <li>Disconnected: {isDisconnected ? "Yes" : "No"}</li>
          <li>Connecting: {isConnecting ? "Yes" : "No"}</li>
        </ul>
      </div>
    </div>
  );
}

describe("useConnection", () => {
  beforeEach(() => {
    client.end();
  });

  it("should connect and disconnect to the MQTT broker", async () => {
    // Arrange
    const { getByText, user } = render(<TestComponent />);

    // Act
    await user.click(getByText("Connect"));

    // Assert
    await waitFor(() =>
      expect(getByText("Connecting: Yes")).toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(getByText("Connected: Yes")).toBeInTheDocument(),
    );

    // Act
    await user.click(getByText("Disconnect"));

    // Assert
    await waitFor(() =>
      expect(getByText("Disconnected: Yes")).toBeInTheDocument(),
    );
  });
});
