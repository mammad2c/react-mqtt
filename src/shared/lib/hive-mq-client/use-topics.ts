import { useSyncExternalStore } from "react";
import { hiveMQClient } from "./hive-mq-client";
import { toast } from "../toast";
import { createExternalStore } from "../create-external-store";

type Store = {
  subscriptions: { topic: string; qos: 0 | 1 | 2 }[];
  isPending: boolean;
};

const initialState: Store = {
  subscriptions: [],
  isPending: false,
};

const { subscribe, updateState, getState } =
  createExternalStore<Store>(initialState);

async function subscribeTopic(topic: string, options: { qos: 0 | 1 | 2 }) {
  updateState({ isPending: true });

  try {
    const result = await hiveMQClient.subscribeAsync(topic, options);
    updateState({
      subscriptions: [...getState().subscriptions, { topic, qos: options.qos }],
      isPending: false,
    });
    return result;
  } catch (error) {
    updateState({ isPending: false });
    toast.create({
      title: "Subscription Error",
      description: error instanceof Error ? error.message : "Unknown error",
      type: "error",
      duration: 6000,
    });
    return false;
  }
}

async function unsubscribeTopic(topic: string) {
  try {
    const result = await hiveMQClient.unsubscribeAsync(topic);
    updateState({
      subscriptions: getState().subscriptions.filter(
        (sub) => sub.topic !== topic,
      ),
    });
    return result;
  } catch (error) {
    toast.create({
      title: "Unsubscription Error",
      description: error instanceof Error ? error.message : "Unknown error",
      type: "error",
      duration: 6000,
    });
    return false;
  }
}

export function useTopics() {
  const state = useSyncExternalStore<Store>(
    subscribe,
    getState,
    () => initialState, // Server snapshot
  );

  const isPending = state.isPending;

  return {
    state,
    subscribeTopic,
    unsubscribeTopic,
    isPending,
  };
}
