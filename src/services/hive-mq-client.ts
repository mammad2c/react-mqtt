import mqtt from "mqtt";

const hiveMQClient = mqtt.connect({
  protocol: "wss",
  manualConnect: true,
  clientId: "hivemq-client",
});

export { hiveMQClient };
