// import NextImage from "next/image";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
  Box,
  Heading,
  Flex,
  Grid,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
  MdCircle,
} from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import MenuList from "./MenuList";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/",
  },
];

const playlists = new Array(30)
  .fill("Playlist")
  .map((item, i) => `${item} ${i + 1}`);

const Sidebar = () => {
  return (
    <Box w="100%" h="calc(100vh - 100px)" bg="black" px={1} color="gray">
      <Flex py={5} h="100%" direction="column">
        <Flex pt={4} pb={8} color="#1DB954" align="end">
          {/* <NextImage src="/logo.png" height={68} width={223} /> */}
          <Icon as={MdCircle} fontSize="5xl" mr={1} />
          <Heading as="div" size="2xl" textAlign="center">
            Spotify
          </Heading>
        </Flex>
        <Box mb={5}>
          <MenuList menus={navMenu} />
        </Box>
        <Box mb={5}>
          <MenuList menus={musicMenu} />
        </Box>

        <Divider my={5} color="gray.800" />
        <Box
          flexGrow="1"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": { width: 0 },
          }}
          py={5}
        >
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem px={5} key={playlist}>
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
