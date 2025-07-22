import { useMessages } from "@/shared/lib/hive-mq-client";
import { Box, Card, Code, Text } from "@chakra-ui/react";

export function MessagesList() {
  const {
    state: { messages },
  } = useMessages();

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Messages List</Card.Title>
      </Card.Header>
      <Card.Body overflowY={"auto"} maxHeight="400px">
        {messages.map((msg, index) => (
          <Box display={"flex"} key={msg.topic + index} mb={4}>
            <Box backgroundColor={"gray.800"} p={1} borderLeftRadius={4}>
              <Code>{index + 1}</Code>
            </Box>
            <Code
              display="block"
              p={4}
              borderLeftRadius={0}
              borderLeft="none"
              width={"100%"}
            >
              <Text color="yellow">
                Topic: <strong>{msg.topic}</strong>
              </Text>
              <Text color="green">
                QoS: <strong>{msg.qos}</strong>
              </Text>

              <Text mt={2}>{msg.message}</Text>
            </Code>
          </Box>
        ))}
      </Card.Body>
    </Card.Root>
  );
}
