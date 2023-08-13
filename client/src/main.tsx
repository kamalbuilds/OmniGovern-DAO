import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { coinbaseWallet, localWallet, metamaskWallet, safeWallet, smartWallet, ThirdwebProvider, walletConnect } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StateProvider } from "./context";
import { GeistProvider, CssBaseline, Themes} from "@geist-ui/core";
import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import { OptimismGoerli , BaseGoerli , ZoraTestnet , ModeTestnet } from "@thirdweb-dev/chains"
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
    clientId="xxc6wSKgwXYpOk9QPfsuCJgDkSMhFGda"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
>
  <ThirdwebProvider
  activeChain={OptimismGoerli}
  clientId="1907611a66678e4abbe5ec7d99e5c160"
  supportedChains={[OptimismGoerli , BaseGoerli , ZoraTestnet , ModeTestnet]}
  supportedWallets={[
    metamaskWallet(),
    coinbaseWallet(),
    safeWallet(),
    smartWallet({
      factoryAddress: "0x854b5b26cAF6227eE2fae1999C1d4389eadB6992", //  deployed account factory address on basegorelli
      gasless: true,
      personalWallets: [metamaskWallet(), coinbaseWallet() , localWallet() ]
    }),
    
  ]}
  >
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
  </ThirdwebProvider>
  </Auth0Provider>
);
