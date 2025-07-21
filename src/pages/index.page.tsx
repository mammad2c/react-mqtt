import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button colorPalette="yellow" asChild>
        <Link href="/hive-mq">HiveMQ</Link>
      </Button>
    </div>
  );
}
