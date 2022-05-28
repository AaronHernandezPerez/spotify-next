import { Box } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Tbody,
  IconButton,
  transition,
} from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Song } from "@prisma/client";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }: { songs: Song[] }) => {
  return (
    <Box>
      <Box padding="3" mb="5">
        <IconButton
          mb="10"
          icon={<BsFillPlayFill fontSize="30px" />}
          aria-label="play"
          size="lg"
          isRound
          color="white"
          bgColor="spotify"
        />
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                key={song.id}
                cursor="pointer"
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
