import { useState } from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { iseSWRConfig } from "swr";
import { auth, Mode } from "../lib/mutations";
import Logo from "./Logo";

const height = 100;
const AuthForm = ({ mode }: { mode: Mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error: authError } = await auth(mode, { email, password });

    setIsLoading(false);

    if (authError) {
      return setError(authError);
    }

    router.push("/");
  };

  return (
    <Box h="100vh" w="100vw" bg="black">
      <Flex
        justify="center"
        align="center"
        h={`${height}px`}
        borderColor="gray.100"
        borderBottom="1px solid"
      >
        <Logo />
      </Flex>
      <Flex
        justify="center"
        align="center"
        w="100%"
        h={`calc(100vh - ${height}px)`}
      >
        <Box p={8} bg="gray.900" borderRadius="sm">
          <form onSubmit={handleSubmit}>
            <Input
              mb={5}
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              mb={5}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Box mb={5} color="red.500">
                {error}
              </Box>
            )}
            <Box>
              <Button
                mb={5}
                type="submit"
                bg="green.500"
                _hover={{ bg: "green.300" }}
                isLoading={isLoading}
              >
                {mode}
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
