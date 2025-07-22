import { delay } from "msw";

class MockMqttClient {
  connected = false;

  listeners: { [key: string]: ((...params: unknown[]) => void)[] } = {};

  subscribedTopics: { [key: string]: { topic: string; qos: 0 | 1 | 2 } } = {};

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
    this.subscribedTopics = {};
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

    const obj = {
      topic,
      qos: (options?.qos ?? 0) as 0 | 1 | 2,
    };

    this.subscribedTopics[topic] = obj;

    return [obj];
  }

  async unsubscribeAsync(topic: string) {
    if (!this.connected) {
      throw new Error("Not connected to MQTT broker");
    }
    const obj = this.subscribedTopics[topic];
    delete this.subscribedTopics[topic];
    this.listeners["unsubscribe"]?.forEach((callback) => callback({ topic }));
    return {
      cmd: "unsuback",
      retain: false,
      qos: obj.qos,
      dup: false,
      length: 2,
      topic: null,
      payload: null,
      messageId: Math.floor(Math.random() * 65535),
    };
  }

  async publishAsync(topic: string, message: string | Buffer) {
    if (!this.connected) {
      throw new Error("Not connected to MQTT broker");
    }

    const qos = this.subscribedTopics[topic]?.qos ?? 0;

    const messageObj = {
      toString: () => message,
    };

    this.listeners["message"]?.forEach((callback) =>
      callback(topic, messageObj, {
        qos,
      }),
    );
  }

  on(event: string, callback: (...params: unknown[]) => void) {
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
