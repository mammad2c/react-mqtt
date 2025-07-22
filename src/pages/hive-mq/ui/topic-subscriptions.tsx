import { useTopics } from "@/shared/lib/hive-mq-client";
import {
  Button,
  Card,
  Field,
  Input,
  NativeSelect,
  Table,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Inputs = {
  topicName: string;
  qos: 0 | 1 | 2;
};

export function TopicSubscriptions() {
  const { subscribeTopic, state, unsubscribeTopic, isPending } = useTopics();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      topicName: "",
      qos: 0,
    },
  });

  function onSubmit(data: Inputs) {
    subscribeTopic(data.topicName, {
      qos: data.qos,
    });
  }

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>HiveMQ</Card.Title>
      </Card.Header>

      <Card.Body>
        <Text mb={4}>
          You can manage your topic subscriptions here. Please subscribe to the
          topics you are interested in.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
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
            <NativeSelect.Root
              {...register("qos", {
                valueAsNumber: true,
                min: 0,
                max: 2,
              })}
            >
              <NativeSelect.Field placeholder="Select option">
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.qos?.message}</Field.ErrorText>
          </Field.Root>

          <Card.Footer pt={4} px={0}>
            <Button type="submit" colorScheme="blue" loading={isPending}>
              Subscribe
            </Button>
          </Card.Footer>
        </form>

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Topic</Table.ColumnHeader>
              <Table.ColumnHeader>QoS</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {state.subscriptions.map((item) => (
              <Table.Row key={item.topic}>
                <Table.Cell>{item.topic}</Table.Cell>
                <Table.Cell>{item.qos}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      unsubscribeTopic(item.topic);
                    }}
                  >
                    Unsubscribe
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  );
}
