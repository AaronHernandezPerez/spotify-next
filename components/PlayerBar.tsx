import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import { useMemo } from "react";
import { StoreModel } from "../lib/store";
import Player from "./Player";

const PlayerBar = () => {
  const activeSongs = useStoreState<StoreModel>((state) => state.activeSongs);
  const activeSong = useStoreState<StoreModel>((state) => state.activeSong);
  const [isLargerXS] = useMediaQuery("(min-width: 24em)");
  const flexDirection = useMemo(
    () => (isLargerXS ? "row" : "column"),
    [isLargerXS]
  );

  return (
    <Box h="100px" w="100vw" bg="gray.900">
      {activeSong ? (
        <Flex
          flexDirection={flexDirection}
          align="center"
          h="full"
          overflowX="scroll"
        >
          <Flex
            align="start"
            justify="center"
            direction="column"
            p="3"
            color="white"
            w="30%"
            maxH="full"
          >
            <Box>
              <Text fontSize="large" noOfLines={2}>
                {activeSong.name}
              </Text>
              <Text fontSize="sm" noOfLines={1}>
                {activeSong.artist.name}
              </Text>
            </Box>
          </Flex>
          <Box flexGrow="1">
            <Player songs={activeSongs} activeSong={activeSong} />
          </Box>
          <Box p="3" color="white" w="30%">
            <Text fontSize="large">{/*  */}</Text>
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

export default PlayerBar;
