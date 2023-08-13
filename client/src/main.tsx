import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StateProvider } from "./context";
import { wagmiClient } from "./utils/wagmi_client";
import { WagmiConfig } from "wagmi";
import { GeistProvider, CssBaseline, Themes} from "@geist-ui/core";
import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});


const myTheme1 = Themes.createFromDark({
  type: 'coolTheme',
  palette: {
    success: '#000',
  },
})

root.render(
  <Auth0Provider
    domain="dev-70uoi5j00y55jl5k.us.auth0.com"
    clientId="FOqCbgSoGq2pH6T2z2j5CxUXWNhomjdT"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
>
  <ThirdwebProvider>
    <WagmiConfig client={wagmiClient}>
      <MantineProvider
        emotionCache={myCache}
        withGlobalStyles
        theme={{
          colorScheme: "dark",
          primaryColor: "blue",
          defaultGradient: {
            from: "blue",
            to: "green",
            deg: 10,
          },
        }}
      >
        <NotificationsProvider position="top-right">
          <Router>
            <StateProvider>
              <GeistProvider themes={[myTheme1]} themeType="coolTheme">
                <CssBaseline />
                <App />
              </GeistProvider>
            </StateProvider>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </WagmiConfig>
  </ThirdwebProvider>
  </Auth0Provider>
);
