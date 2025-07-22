import { useSyncExternalStore } from "react";
import { hiveMQClient as client } from "./hive-mq-client";
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

async function subscribeTopic(
  topic: string,
  options: { qos: 0 | 1 | 2; updateQoS?: boolean } = {
    qos: 0,
    updateQoS: false,
  },
) {
  const qos = (Number(options.qos) as 0 | 1 | 2) || 0;
  const subscriptions = getState().subscriptions;

  if (!options.updateQoS) {
    if (subscriptions.find((sub) => sub.topic === topic)) {
      toast.create({
        title: "Already Subscribed",
        description: `You are already subscribed to ${topic}.`,
        type: "error",
      });
      return false;
    }

    updateState({ isPending: true });
  }

  try {
    const result = await client.subscribeAsync(topic, {
      qos,
    });
    if (options.updateQoS) {
      const index = subscriptions.findIndex((sub) => sub.topic === topic);

      if (index !== -1) {
        updateState({
          subscriptions: [
            ...subscriptions.slice(0, index),
            { topic, qos },
            ...subscriptions.slice(index + 1),
          ],
          isPending: false,
        });
      }
    } else {
      updateState({
        subscriptions: [...subscriptions, { topic, qos }],
        isPending: false,
      });
    }
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
    const result = await client.unsubscribeAsync(topic);
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

async function changeTopicQoS(topic: string, qos: 0 | 1 | 2) {
  try {
    await subscribeTopic(topic, { qos, updateQoS: true });
  } catch (error) {
    toast.create({
      title: "Change QoS Error",
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
    changeTopicQoS,
  };
}
