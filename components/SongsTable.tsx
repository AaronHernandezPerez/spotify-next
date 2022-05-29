import { Box } from "@chakra-ui/layout";
import { Table, Thead, Th, Td, Tr, Tbody, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";
import { useStoreActions, useStoreState } from "easy-peasy";
import { formatDate, formatTime } from "../lib/formatters";
import { StoreModel } from "../lib/store";

const SongsTable = ({ songs }: { songs: Song[] }) => {
  const changeActiveSongs = useStoreActions<StoreModel>(
    (store) => store.changeActiveSongs
  );
  const changeActiveSong = useStoreActions<StoreModel>(
    (store) => store.changeActiveSong
  );
  const activeSong = useStoreState<StoreModel>((state) => state.activeSong);

  const handlePlay = (newSong?: Song) => {
    changeActiveSong(newSong || songs[0]);
    changeActiveSongs(songs);
  };

  return (
    <Box padding="3" mb="5">
      <IconButton
        mb="10"
        icon={<BsFillPlayFill fontSize="2rem" />}
        aria-label="play"
        size="lg"
        isRound
        color="white"
        bgColor="spotify"
        onClick={() => handlePlay()}
      />
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Added</Th>
            <Th>
              <AiOutlineClockCircle fontSize="1rem" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, i) => (
            <Tr
              key={song.id}
              cursor="pointer"
              onClick={() => handlePlay(song)}
              sx={{
                transition: "background-color .3s",
                "&:hover": {
                  bg: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Td color={activeSong?.id === song.id ? "spotify" : ""}>
                {i + 1}
              </Td>
              <Td color={activeSong?.id === song.id ? "spotify" : ""}>
                {song.name}
              </Td>
              <Td>{formatDate(song.createdAt, "es-ES")}</Td>
              <Td>{formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
