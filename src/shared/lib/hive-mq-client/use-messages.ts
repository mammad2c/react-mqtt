import { useSyncExternalStore } from "react";
import { createExternalStore } from "@/shared/lib/create-external-store";
import { hiveMQClient as client } from "./hive-mq-client";
import { toast } from "@/shared/lib/toast";

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

async function sendMessage(topic: string, message: string, qos: 0 | 1 | 2) {
  try {
    const numberQos = (Number(qos) as 0 | 1 | 2) || 0;
    const result = await client.publishAsync(topic, message, {
      qos: numberQos,
    });
    return result;
  } catch (error) {
    toast.create({
      title: "Send Message Error",
      description: error instanceof Error ? error.message : "Unknown error",
      type: "error",
      duration: 6000,
    });
    return false;
  }
}

export function useMessages() {
  const state = useSyncExternalStore<Store>(
    subscribe,
    getState,
    () => initialState, // Server snapshot
  );

  return {
    state,
    sendMessage,
  };
}
