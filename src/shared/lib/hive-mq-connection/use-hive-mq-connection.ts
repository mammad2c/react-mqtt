import { hiveMQConnection } from "./hive-mq-connection";
import { toast } from "@/shared/lib/toast/toast";
import type mqtt from "mqtt";
import { useSyncExternalStore } from "react";

let connectionStatus: "connecting" | "connected" | "disconnected" =
  "disconnected";

function subscribe(onStoreChange: () => void) {
  const handleConnect = () => {
    toast.create({
      title: "Connected",
      description: "You are now connected to the MQTT broker.",
      type: "success",
      duration: 6000,
    });
    connectionStatus = "connected";
    onStoreChange();
  };

  const handleError = (err: Error) => {
    hiveMQConnection.end();
    toast.create({
      title: "Connection error",
      description: err.message,
      type: "error",
      duration: 6000,
    });
    connectionStatus = "disconnected";
    onStoreChange();
  };

  const handleEnd = () => {
    toast.create({
      title: "Disconnected",
      description: "You have been disconnected from the MQTT broker.",
      type: "info",
      duration: 6000,
    });
    connectionStatus = "disconnected";
    onStoreChange();
  };

  hiveMQConnection.on("connect", handleConnect);
  hiveMQConnection.on("error", handleError);
  hiveMQConnection.on("end", handleEnd);

  return () => {
    hiveMQConnection.off("connect", handleConnect);
    hiveMQConnection.off("error", handleError);
    hiveMQConnection.off("end", handleEnd);
  };
}

function getSnapshot(): typeof connectionStatus {
  return connectionStatus;
}

function getServerSnapshot(): typeof connectionStatus {
  return "disconnected";
}

function disconnect() {
  hiveMQConnection.end();
}

function connect(
  options: Pick<
    mqtt.IClientOptions,
    "username" | "password" | "port" | "host" | "path"
  >,
) {
  if (hiveMQConnection.connected) {
    toast.create({
      title: "Already connected",
      description: "You are already connected to the MQTT broker.",
      type: "warning",
      duration: 6000,
    });
    return;
  }

  hiveMQConnection.options.username = options.username;
  hiveMQConnection.options.password = options.password;
  hiveMQConnection.options.port = options.port;
  hiveMQConnection.options.host = options.host;
  hiveMQConnection.options.path = options.path;

  connectionStatus = "connecting";

  try {
    hiveMQConnection.connect();
  } catch (error) {
    toast.create({
      title: "Connection failed",
      description: (error as Error).message,
      type: "error",
      duration: 6000,
    });
    connectionStatus = "disconnected";
    return;
  }
}

export function useHiveMQConnection() {
  if (!hiveMQConnection) {
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
