import { formatUnits, parseEther } from "@ethersproject/units";

export const addresses = {
  UNIPEER_ADDRESS: {
    100: "",
    10200: "0xCF5F227De666AF96Cf671Cd5727247A427b28b7A"
  }
}
export const constants = {
  DAI_ADDRESS: "",
  COMPTROLLER_ADDRESS: "0xcE589FC23EE7AB377e07c513e6b32e93ab57CF1B",
  ESCROW_ADDRESS: "0x8eeC1CDc04feBceaF80543ab6887E2a7fdEB88CE",
  ESCROW_FACTORY_ADDRESS: "0x8f83522DECe212fCcc0a124A14b59C1EaA07882F",
}

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

const ETHERSCAN_URL= {
  1: "https://etherscan.io",
  100: "https://gnosisscan.io",
  10200: "https://rpc.chiadochain.net",
};

export const RPC_URL: { [key: number]: string } = {
  1: "mainnet",
  100: "https://rpc.gnosischain.com.",
  10200: "https://blockscout.chiadochain.net",
}

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {[number, string]} data
 */
export function formatEtherscanLink(type, data) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_URL[chainId]}/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_URL[chainId]}/tx/${hash}`;
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
