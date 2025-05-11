import mqtt from "mqtt";

const hiveMQClient = mqtt.connect({
  protocol: "wss",
  // host: "ac007b03dfe54dd7affcba83006caede.s1.eu.hivemq.cloud",
  // port: 8884,
  // path: "/mqtt",
  // username: "hivemq.webclient.1746800203662",
  // password: "2p$5#W6&M;jyiK0FEVlv",
  manualConnect: true,
  clientId: "hivemq-client",
});

export { hiveMQClient };
