import { Button, Center, Container, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Center p={8} flexDirection="column">
        <Text>Welcome to the MQTT Dashboard</Text>
        <Text>Explore the various MQTT brokers available.</Text>

        <Text fontWeight="bold" my={8}>
          Warning: This project is only a demo and not intended for production
          use.
        </Text>

        <Text mb={4}>Available brokers:</Text>
        <div>
          <Button colorPalette="yellow" asChild>
            <Link href="/hive-mq">HiveMQ</Link>
          </Button>
        </div>
      </Center>
    </Container>
  );
}
