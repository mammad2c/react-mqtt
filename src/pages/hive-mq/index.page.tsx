import { Box, Button, Center, Container, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useConnection } from "@/shared/lib/hive-mq-client";
import { ClientConnectionForm } from "./ui/client-connection-form";
import { TopicSubscriptions } from "./ui/topic-subscriptions";
import { MessagesList } from "./ui/messages-list";
import { SendMessage } from "./ui/send-message";

export default function HiveMQ() {
  const { isConnected, isDisconnected, disconnect } = useConnection();

  return (
    <Container py={8}>
      {isConnected && (
        <Box mb={4}>
          <Button onClick={disconnect} colorPalette="red">
            Disconnect
          </Button>
        </Box>
      )}

      <Center flexDirection="column">
        {isDisconnected && <ClientConnectionForm />}
        {isConnected && (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <TopicSubscriptions />
              <MessagesList />
              <SendMessage />
            </Grid>
          </>
        )}
        <Text as={"div"} pt={4}>
          <Link className="mt-4" href="/">
            Back to Home
          </Link>
        </Text>
      </Center>
    </Container>
  );
}
