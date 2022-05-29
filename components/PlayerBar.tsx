import { Box, Flex, Text } from "@chakra-ui/layout";
import { Song } from "@prisma/client";
import { useStoreState } from "easy-peasy";
import { StoreModel } from "../lib/store";
import Player from "./Player";

const PlayerBar = () => {
  const activeSongs = useStoreState<StoreModel>((state) => state.activeSongs);
  const activeSong = useStoreState<StoreModel>((state) => state.activeSong);

  return (
    <Box h="100px" w="100vw" bg="gray.900">
      {activeSong ? (
        <Flex align="center">
          <Box p="3" color="white" w="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
          <Box flexGrow="1">
            <Player songs={activeSongs} activeSong={activeSong} />
          </Box>
          <Box p="3" color="white" w="30%">
            <Text fontSize="large">Options</Text>
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

export default PlayerBar;
