import { Button } from "@chakra-ui/react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <Button colorPalette="yellow" asChild>
        <Link to="/hive-mq">HiveMQ</Link>
      </Button>
    </div>
  );
}
