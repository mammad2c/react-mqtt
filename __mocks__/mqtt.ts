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

  async subscribeAsync(
    topic: string,
    options: { qos: 0 | 1 | 2 } = { qos: 0 },
  ) {
    if (!this.connected) {
      throw new Error("Not connected to MQTT broker");
    }
    this.listeners["message"]?.forEach((callback) =>
      callback({ topic, qos: options.qos }),
    );
    return [{ topic, qos: options.qos }];
  }

  async unsubscribeAsync(topic: string) {
    if (!this.connected) {
      throw new Error("Not connected to MQTT broker");
    }
    this.listeners["unsubscribe"]?.forEach((callback) => callback({ topic }));
    return {
      cmd: "unsuback",
      retain: false,
      qos: 0,
      dup: false,
      length: 2,
      topic: null,
      payload: null,
      messageId: Math.floor(Math.random() * 65535),
    };
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
