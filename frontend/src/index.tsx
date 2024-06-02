import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { MetaMaskProvider } from "@metamask/sdk-react";
import App from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MetaMaskProvider
        debug={true}
        sdkOptions={{
          dappMetadata: {
            name: "dPoll",
            url: window.location.href,
          },
        }}
      >
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </MetaMaskProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
