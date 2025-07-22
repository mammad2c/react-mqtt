import { Card } from "@chakra-ui/react";
import { SubscriptionForm } from "./subscription-form";
import { SubscribedTopics } from "./subscribed-topics";

export function TopicSubscriptions() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Topic Subscriptions</Card.Title>
      </Card.Header>

      <Card.Body>
        <SubscriptionForm />
        <SubscribedTopics />
      </Card.Body>
    </Card.Root>
  );
}
