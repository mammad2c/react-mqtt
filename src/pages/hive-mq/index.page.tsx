import { Center, Container, Text } from "@chakra-ui/react";
import ConnectionForm from "./ui/connection-form";
import Link from "next/link";
import { useConnection } from "@/shared/lib/hive-mq-client";

export default function HiveMQ() {
  const { isDisconnected } = useConnection();

  return (
    <Container py={8}>
      <Center flexDirection="column">
        {isDisconnected && <ConnectionForm />}
        <Text as={"div"} pt={4}>
          <Link className="mt-4" href="/">
            Back to Home
          </Link>
        </Text>
      </Center>
    </Container>
  );
}
