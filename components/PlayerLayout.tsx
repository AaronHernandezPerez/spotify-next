import { PropsWithChildren, useState, useCallback } from "react";
import { Box } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import { Show } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";

const NavBarNoSSR = dynamic(() => import("./NavBar"), {
  ssr: false,
});

const PlayerLayout = ({ children }: PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <Box w="100vw" h="100vh">
      <Box
        position="absolute"
        top={{ base: "12", md: "0px" }}
        w="250px"
        left={{ base: open ? 0 : "-250px", md: "0px" }}
        sx={{
          transition: { base: "left 0.2s ease-in-out", md: "none" },
        }}
        zIndex="sticky"
      >
        <Sidebar />
      </Box>
      <Box ml={{ base: 0, md: "250px" }} mb="100px" h="calc(100vh - 100px)">
        <Show below="md">
          <NavBarNoSSR open={open} toggleOpen={toggleOpen} />
        </Show>
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
