import { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, ThemeTypings } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage = false,
}: {
  color: ThemeTypings["colorSchemes"];
  children: ReactNode;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage?: boolean;
}) => {
  return (
    <Box
      h="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.800 40%, rgba(0,0,0, .95) 75%)`}
    >
      <Flex bg={`${color}.600`} p="5" align="end">
        <Box p={2}>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "2xl"}
          />
        </Box>
        <Box p="10" pb="0" color="white">
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="sm">{description}</Text>
        </Box>
      </Flex>
      <Box py="10">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
