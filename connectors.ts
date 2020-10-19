import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { POKT_PREFIXES } from './util';

export function getNetwork(defaultChainId = 1): NetworkConnector {
  return new NetworkConnector({
    urls: [1, 3, 4, 5, 42].reduce(
      (urls, chainId) =>
        Object.assign(urls, {
          [chainId]: `https://${POKT_PREFIXES[chainId]}.gateway.pokt.networt/v1/${process.env.POKT_PROJECT_ID}`,
        }),
      {}
    ),
    defaultChainId,
  })
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: `https://${POKT_PREFIXES[1]}.gateway.pokt.networt/v1/${process.env.POKT_PROJECT_ID}`,
  },
  bridge: 'https://bridge.walletconnect.org',
})
