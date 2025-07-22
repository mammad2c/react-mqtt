import { Center, Container, Grid, Text } from "@chakra-ui/react";
import ConnectionForm from "./ui/connection-form";
import Link from "next/link";
import { useConnection } from "@/shared/lib/hive-mq-client";
import { TopicSubscriptions } from "./ui/topic-subscriptions";
import { MessagesList } from "./ui/messages-list";

export default function HiveMQ() {
  const { isConnected, isDisconnected } = useConnection();

  return (
    <Container py={8}>
      <Center flexDirection="column">
        {isDisconnected && <ConnectionForm />}
        {isConnected && (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <TopicSubscriptions />
              <MessagesList />
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
