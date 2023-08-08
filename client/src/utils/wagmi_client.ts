import { celo, celoAlfajores, polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, Chain , Connector , createClient, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";


const { chains, provider } = configureChains(
  [polygon, polygonMumbai , goerli , celoAlfajores , celo],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
  ],
  provider,
});
