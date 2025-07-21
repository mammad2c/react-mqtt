import mqtt from "mqtt";

const hiveMQConnection = mqtt.connect({
  protocol: "wss",
  manualConnect: true,
  clientId: "hivemq-client",
});

export { hiveMQConnection };
