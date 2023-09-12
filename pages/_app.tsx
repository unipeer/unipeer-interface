import type { AppProps } from "next/app";
import "../styles/index.css";

import {
  Chain,
  WagmiConfig,
  createClient,
  configureChains,
  chain,
} from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { ConnectKitProvider } from "connectkit";

import { Provider } from 'react-redux';
import store from '../redux-api/stores/root-store';

const chiadoExplorer = {
  name: "blockscout",
  url: "https://blockscout.chiadochain.net",
};

const gnosisExplorer = {
  name: "etherscan",
  url: "https://gnosisscan.io",
};

const chiado: Chain = {
  id: 10200,
  name: "Chiado",
  network: "chaido",
  rpcUrls: {
    public: "https://rpc.chiadochain.net",
    default: "https://rpc.chiadochain.net",
  },
  blockExplorers: {
    blockscout: chiadoExplorer,
    default: chiadoExplorer,
  },
  testnet: true,
};

const gnosis: Chain = {
  id: 100,
  name: "Gnosis Chain",
  network: "gnosis",
  rpcUrls: {
    public: "https://rpc.gnosischain.com",
    default: "https://rpc.gnosischain.com",
  },
  blockExplorers: {
    etherscan: gnosisExplorer,
    default: gnosisExplorer,
  },
  testnet: true,
};

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli, chiado, gnosis],
  [
    alchemyProvider({
      apiKey: "NS_hpSkXxGXkrl5Paz4KPlZWHZGAPCxC",
      priority: 0,
    }),
    infuraProvider({ apiKey: "6f3991348bbd4261823c3904d2425cc3", priority: 1 }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain?.id == 5) return { http: "" };
        return { http: chain.rpcUrls.default };
      },
      priority: 2,
    }),
  ],
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const configuredRootStore = store();


function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Provider store={configuredRootStore}>
          <Component {...pageProps} />
        </Provider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default NextWeb3App;
