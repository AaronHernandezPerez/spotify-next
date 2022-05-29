import NextLink from "next/link";
import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  ListIcon,
} from "@chakra-ui/layout";
import { IconType } from "react-icons";

interface Props {
  menus: {
    name: string;
    icon: IconType;
    route: string;
  }[];
}
const MenuList = ({ menus }: Props) => {
  return (
    <List spacing={2}>
      {menus.map((menu) => (
        <ListItem px={5} fontSize="lg" key={menu.name}>
          <LinkBox>
            <NextLink href={menu.route} passHref>
              <LinkOverlay>
                <ListIcon as={menu.icon} color="white" mr={5} />
                {menu.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
