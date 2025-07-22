import { useMessages } from "@/shared/lib/hive-mq-client";
import { Button, Card, Field, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { QoSSelector } from "../topic-subscriptions/qos-selector";

type Inputs = {
  topic: string;
  message: string;
  qos: 0 | 1 | 2;
};

export function SendMessage() {
  const { sendMessage } = useMessages();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function onSubmit(data: Inputs) {
    sendMessage(data.topic, data.message, data.qos);
  }

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Send Message</Card.Title>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root required mb={4}>
            <Field.Label>
              Topic <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="topic" {...register("topic")} />
            <Field.ErrorText>{errors.topic?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required mb={4}>
            <Field.Label>
              QoS <Field.RequiredIndicator />
            </Field.Label>
            <QoSSelector {...register("qos")} />
          </Field.Root>

          <Field.Root required mb={4}>
            <Field.Label>
              Message <Field.RequiredIndicator />
            </Field.Label>
            <Textarea placeholder="message" {...register("message")} />
            <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit">Send</Button>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
