// import NextImage from "next/image";
import NextLink from "next/link";
import {
  List,
  ListItem,
  Divider,
  LinkBox,
  LinkOverlay,
  Box,
  Flex,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import MenuList from "./MenuList";
import Logo from "./Logo";
import { usePlaylist } from "../lib/hooks";

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

const Sidebar = () => {
  const { data: playlists } = usePlaylist();

  return (
    <Box w="100%" h="calc(100vh - 100px)" bg="black" px={1} color="gray">
      <Flex py={5} h="100%" direction="column">
        <Logo />
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
              <ListItem px={5} key={playlist.id}>
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist.name}</LinkOverlay>
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
