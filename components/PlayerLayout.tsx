import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";

const PlayerLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box w="100vw" h="100vh">
      <Box position="absolute" top="0" w="250px" left="0">
        <Sidebar />
      </Box>
      <Box ml="250px" mb="100px" h="calc(100vh - 100px)">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
