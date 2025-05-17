import { hiveMQClient as client } from "@/services/hiveMQClient";
import { toaster } from "@/utils/toaster";
import type mqtt from "mqtt";
import { useState } from "react";

export function useHiveMQClient() {
  if (!client) {
    throw new Error("MQTT client is not initialized");
  }

  const [state, setState] = useState({
    isPending: client.disconnecting || client.reconnecting,
    connected: client.connected,
  });

  function disconnect() {
    setState({
      ...state,
      isPending: true,
    });

    client.end();
  }

  function connect(
    options: Pick<
      mqtt.IClientOptions,
      "username" | "password" | "port" | "host" | "path"
    > = {},
  ) {
    if (client.connected) {
      toaster.create({
        title: "Already connected",
        description: "You are already connected to the MQTT broker.",
        type: "warning",
        duration: 6000,
      });
      return;
    }

    setState({
      ...state,
      isPending: true,
    });

    client.on("connect", () => {
      setState({
        ...state,
        isPending: false,
        connected: true,
      });

      toaster.create({
        title: "Connected",
        description: "You are now connected to the MQTT broker.",
        type: "success",
        duration: 6000,
      });
    });

    client.on("error", (err) => {
      setState({
        ...state,
        isPending: false,
        connected: false,
      });

      client.end();
      toaster.create({
        title: "Connection error",
        description: err.message,
        type: "error",
        duration: 6000,
      });
    });

    client.on("end", () => {
      setState({
        ...state,
        isPending: false,
        connected: false,
      });

      toaster.create({
        title: "Disconnected",
        description: "You have been disconnected from the MQTT broker.",
        type: "info",
        duration: 6000,
      });
    });

    client.options.username = options.username;
    client.options.password = options.password;
    client.options.port = options.port;
    client.options.host = options.host;
    client.options.path = options.path;

    client.connect();
  }

  return {
    state,
    connect,
    disconnect,
  };
}
