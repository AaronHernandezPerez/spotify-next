import { ReactNode, ComponentType } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import { AppProps } from "next/app";
import "reset-css";
import { store } from "../lib/store";
import PlayerLayout from "../components/PlayerLayout";

const theme = extendTheme({
  config: { initialColorMode: "dark" },
  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    spotify: "#1DB954",
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    authPage?: boolean;
  };
}

type Props = StoreProvider["props"] & { children: ReactNode };
const StoreProviderCasted = StoreProvider as unknown as ComponentType<Props>;

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProviderCasted store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProviderCasted>
    </ChakraProvider>
  );
};

export default MyApp;
