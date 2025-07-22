import { hiveMQClient as client } from "./hive-mq-client";
import { toast } from "@/shared/lib/toast/toast";
import type mqtt from "mqtt";
import { useSyncExternalStore } from "react";
import { createExternalStore } from "../create-external-store";

type Store = {
  status: "connected" | "disconnected" | "connecting";
};

const initialState: Store = {
  status: client.connected ? "connected" : "disconnected",
};

const { subscribe, updateState, getState } =
  createExternalStore<Store>(initialState);

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
    return;
  }

  client.options.username = options.username;
  client.options.password = options.password;
  client.options.port = options.port;
  client.options.host = options.host;
  client.options.path = options.path;

  updateState({ status: "connecting" });

  try {
    client.connect();
  } catch (error) {
    toast.create({
      title: "Connection failed",
      description: (error as Error).message,
      type: "error",
      duration: 6000,
    });
    client
      .endAsync()
      .then(() => updateState({ status: "disconnected" }))
      .catch(() => {
        updateState({ status: "disconnected" });
      });
    return;
  }
}

client.on("connect", () => {
  updateState({ status: "connected" });
});

client.on("close", () => {
  updateState({ status: "disconnected" });
});

client.on("error", (error) => {
  updateState({ status: "disconnected" });
  toast.create({
    title: "Connection Error",
    description: error instanceof Error ? error.message : "Unknown error",
    type: "error",
    duration: 6000,
  });
});

client.on("offline", () => {
  updateState({ status: "disconnected" });
});

export function useConnection() {
  const state = useSyncExternalStore<Store>(
    subscribe,
    getState,
    () => initialState, // Server snapshot
  );

  const isConnected = state.status === "connected";
  const isDisconnected = state.status === "disconnected";
  const isConnecting = state.status === "connecting";

  return {
    state,
    connect,
    disconnect,
    isConnected,
    isDisconnected,
    isConnecting,
  };
}
