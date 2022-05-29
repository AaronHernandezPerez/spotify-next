import { Flex } from "@chakra-ui/layout";
import { IconButton, Show } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <Show below="md">
      <Flex h="12" align="center" backgroundColor="rgba(0,0,0,0.25)">
        <IconButton
          outline="none"
          variant="link"
          aria-label="menu"
          fontSize="2xl"
          color="white"
          icon={<GiHamburgerMenu />}
          sx={{
            transition: "transform 0.2s ease-in-out",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
          onClick={toggleOpen}
        />
      </Flex>
    </Show>
  );
};

export default NavBar;
