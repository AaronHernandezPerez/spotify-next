import { Flex, Heading } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { MdCircle } from "react-icons/md";

const Logo = () => {
  return (
    <Flex pt={4} pb={8} color="spotify" align="end">
      {/* <NextImage src="/logo.png" height={68} width={223} /> */}
      <Icon as={MdCircle} fontSize="5xl" mr={1} />
      <Heading as="div" size="2xl" textAlign="center">
        Spotify
      </Heading>
    </Flex>
  );
};

export default Logo;
