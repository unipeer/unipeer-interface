import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { RPC_URL } from './util';

export function getNetwork(defaultChainId = 100100): NetworkConnector {
  return new NetworkConnector({
    urls: [1, 100, 100100].reduce(
      (urls, chainId) =>
        Object.assign(urls, {
          [chainId]: RPC_URL[chainId],
        }),
      {}
    ),
    defaultChainId,
  })
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 100, 100100],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URL[1],
  },
  bridge: 'https://bridge.walletconnect.org',
})
