import { delay } from "msw";

class MockMqttClient {
  connected = false;

  listeners: { [key: string]: ((params?: unknown) => void)[] } = {};

  options: { [key: string]: unknown } = {};

  connect() {
    delay(200).then(() => {
      this.connected = true;
      this.listeners["connect"]?.forEach((callback) => callback());
    });
  }

  disconnect() {
    this.connected = false;
    this.listeners["close"]?.forEach((callback) => callback());
  }

  end() {
    this.connected = false;
    this.listeners["close"]?.forEach((callback) => callback());
  }

  reconnect() {
    this.connect();
  }

  on(event: string, callback: (params?: unknown) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
}

const client = new MockMqttClient();

const obj = {
  connect: () => client,
};

export default obj;
