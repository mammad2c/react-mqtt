import { useSyncExternalStore } from "react";
import { createExternalStore } from "@/shared/lib/create-external-store";
import { hiveMQClient as client } from "./hive-mq-client";

type Store = {
  messages: { topic: string; message: string; qos: 0 | 1 | 2 }[];
};

const initialState: Store = {
  messages: [],
};

const { subscribe, getState, updateState } =
  createExternalStore<Store>(initialState);

client.on("message", (topic, message, packet) => {
  const state = getState();
  const newMessage = {
    topic,
    message: message.toString(),
    qos: packet.qos,
  };

  updateState({
    messages: [...state.messages, newMessage],
  });
});

export function useMessages() {
  const state = useSyncExternalStore<Store>(
    subscribe,
    getState,
    () => initialState, // Server snapshot
  );

  return state;
}
