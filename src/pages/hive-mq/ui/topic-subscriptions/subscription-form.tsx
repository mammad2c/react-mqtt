import { useTopics } from "@/shared/lib/hive-mq-client";
import { Button, Card, Field, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { QoSSelector } from "./qos-selector";

type Inputs = {
  topicName: string;
  qos: 0 | 1 | 2;
};

export function SubscriptionForm() {
  const { subscribeTopic, isPending } = useTopics();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      topicName: "",
      qos: 0,
    },
  });

  async function onSubmit(data: Inputs) {
    const result = await subscribeTopic(data.topicName, {
      qos: data.qos,
    });

    if (result) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
      <Text mb={4}>
        You can manage your topic subscriptions here. Please subscribe to the
        topics you are interested in.
      </Text>
      <Field.Root required mb={4}>
        <Field.Label>
          Topic Name <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="Topic Name" {...register("topicName")} />
        <Field.ErrorText>{errors.topicName?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required>
        <Field.Label>
          QoS Level <Field.RequiredIndicator />
        </Field.Label>
        <QoSSelector {...register("qos")} />
        <Field.ErrorText>{errors.qos?.message}</Field.ErrorText>
      </Field.Root>

      <Card.Footer pt={4} px={0}>
        <Button type="submit" colorScheme="blue" loading={isPending}>
          Subscribe
        </Button>
      </Card.Footer>
    </form>
  );
}
