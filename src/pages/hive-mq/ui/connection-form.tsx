import { useConnection } from "@/shared/lib/hive-mq-client";
import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  host: string;
  username: string;
  password: string;
  port: number;
  path?: string;
};

export default function ConnectionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { state, connect } = useConnection();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    connect(data);
  };

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>HiveMQ</Card.Title>
      </Card.Header>

      <Card.Body>
        <Text>
          HiveMQ is a popular MQTT broker that provides a cloud-based solution
          for IoT messaging.
        </Text>

        <Text>
          It offers features like scalability, security, and easy integration
          with various platforms.
        </Text>

        <Text>
          Please set your username and password and host to connect to your
          HiveMQ.
        </Text>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <Text as="strong">
            Attention: This project is only for educational purposes. Please do
            not use it for production.
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
          <Stack gap="4" marginTop={4}>
            <Field.Root required>
              <Field.Label>
                Host <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="host" {...register("host")} />
              <Field.ErrorText>{errors.host?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Username <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="username"
                {...register("username")}
                autoComplete="nope"
              />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="password"
                type="password"
                {...register("password")}
                autoComplete="nope"
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Port <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="port"
                type="number"
                {...register("port")}
                autoComplete="nope"
              />
              <Field.ErrorText>{errors.port?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Path</Field.Label>
              <Input
                placeholder="path"
                {...register("path")}
                autoComplete="nope"
              />
            </Field.Root>

            <Button
              colorPalette="yellow"
              loading={state.status === "connecting"}
              type="submit"
            >
              Connect
            </Button>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
