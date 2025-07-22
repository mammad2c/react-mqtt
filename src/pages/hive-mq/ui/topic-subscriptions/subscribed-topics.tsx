import { useTopics } from "@/shared/lib/hive-mq-client";
import { Button, Table } from "@chakra-ui/react";
import { QoSSelector } from "./qos-selector";

export function SubscribedTopics() {
  const { state, unsubscribeTopic, changeTopicQoS } = useTopics();

  return (
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
            <Table.Cell>
              <QoSSelector
                value={item.qos}
                onChange={(e) => {
                  const value = (e.target as HTMLSelectElement).value;
                  changeTopicQoS(item.topic, Number(value) as 0 | 1 | 2);
                }}
              />
            </Table.Cell>
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
  );
}
