import { hiveMQClient as client } from "@/services/hive-mq-client";
import { toaster } from "@/utils/toaster";
import type mqtt from "mqtt";
import { useSyncExternalStore } from "react";

let connectionStatus: "connecting" | "connected" | "disconnected" =
  "disconnected";

function subscribe(onStoreChange: () => void) {
  const handleConnect = () => {
    toaster.create({
      title: "Connected",
      description: "You are now connected to the MQTT broker.",
      type: "success",
      duration: 6000,
    });
    connectionStatus = "connected";
    onStoreChange();
  };

  const handleError = (err: Error) => {
    client.end();
    toaster.create({
      title: "Connection error",
      description: err.message,
      type: "error",
      duration: 6000,
    });
    connectionStatus = "disconnected";
    onStoreChange();
  };

  const handleEnd = () => {
    toaster.create({
      title: "Disconnected",
      description: "You have been disconnected from the MQTT broker.",
      type: "info",
      duration: 6000,
    });
    connectionStatus = "disconnected";
    onStoreChange();
  };

  client.on("connect", handleConnect);
  client.on("error", handleError);
  client.on("end", handleEnd);

  return () => {
    client.off("connect", handleConnect);
    client.off("error", handleError);
    client.off("end", handleEnd);
  };
}

function getSnapshot(): typeof connectionStatus {
  return connectionStatus;
}

function getServerSnapshot(): typeof connectionStatus {
  return "disconnected";
}

function disconnect() {
  client.end();
}

function connect(
  options: Pick<
    mqtt.IClientOptions,
    "username" | "password" | "port" | "host" | "path"
  >,
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

  client.options.username = options.username;
  client.options.password = options.password;
  client.options.port = options.port;
  client.options.host = options.host;
  client.options.path = options.path;

  connectionStatus = "connecting";
  client.connect();
}

export function useHiveMQClient() {
  if (!client) {
    throw new Error("MQTT client is not initialized");
  }

  const status = useSyncExternalStore<typeof connectionStatus>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    status,
    connect,
    disconnect,
  };
}
