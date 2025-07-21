import { Center, Container, Text } from "@chakra-ui/react";
import ConnectionForm from "./ui/connection-form";
import Link from "next/link";

export default function HiveMQ() {
  return (
    <Container py={8}>
      <Center flexDirection="column">
        <ConnectionForm />
        <Text as={"div"} pt={4}>
          <Link className="mt-4" href="/">
            Back to Home
          </Link>
        </Text>
      </Center>
    </Container>
  );
}
