import { formatUnits, parseEther } from "@ethersproject/units";

export const addresses = {
  UNIPEER: {
    5: "0xd56e8f3c7731f6e0d85a47de55926f0de8cc0368",
    100: "",
    10200: "0x4Ad052B87573d183fBD173B56E0a1A4dbbc5529a",
  },
  DAI: {
    5: "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
    100: "",
    10200: "0x18c8a7ec7897177E4529065a7E7B0878358B3BfF",
  },
};

export const constants = {
  defaultChainId: 10200,
  block: {
    5: 7830833,
    100: 222028,
    10200: 299989,
  },
};

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

const ETHERSCAN_URL = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  100: "https://gnosisscan.io",
  10200: "https://blockscout.chiadochain.net",
};

export const RPC_URL: { [key: number]: string } = {
  1: "mainnet",
  100: "https://rpc.gnosischain.com.",
  10200: "https://rpc.chiadochain.net",
};

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {[number, string]} data
 */
export function formatEtherscanLink(type, data) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `${ETHERSCAN_URL[chainId]}/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `${ETHERSCAN_URL[chainId]}/tx/${hash}`;
    }
  }
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
  Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);
