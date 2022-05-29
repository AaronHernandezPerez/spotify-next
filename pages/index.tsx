import { Box, Flex, Text } from "@chakra-ui/layout";
import { Artist } from "@prisma/client";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import { hideScrollBar } from "../lib/chakra";
import { useGetUser } from "../lib/hooks";

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

const Home = ({ artists }: { artists: Artist[] }) => {
  const { data: user } = useGetUser();
  return (
    <GradientLayout
      color="red"
      title={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
      subtitle="profile"
      description={`${user?.playlistsCount} public playlists`}
      image="https://placekitten.com/300/300"
    >
      <Box color="white" paddingX="4">
        <Box mb="10">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex gap="4rem" overflowX="auto" pb="1" sx={hideScrollBar}>
          {artists.map((artist) => (
            <Box minW="200px" w="20%" key={artist.id}>
              <Box p="4" bg="gray.900" borderRadius="base">
                <Image
                  src={`https://picsum.photos/id/${artist.id}/300/300`}
                  borderRadius="full"
                />
                <Box mt="5">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export default Home;
