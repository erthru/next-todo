import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </Provider>
);

export default MyApp;
