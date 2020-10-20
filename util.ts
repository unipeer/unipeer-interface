import { formatUnits, parseEther } from "@ethersproject/units";

export const constants = {
  COMPTROLLER_ADDRESS: "0x3E5A1dec88f22b0beb8BdDf5a6460360C2DcAd1B",
  ESCROW_ADDRESS: "0xAE25fa6b162D1eA31ccb4Da7276fB932D36F6C87",
  ESCROW_FACTORY_ADDRESS: "0x2aF149a52314eF434501DDD752A22de824202FD0",
}

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export const INFURA_PREFIXES: { [key: number]: string } = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
}

export const POKT_PREFIXES: { [key: number]: string } = {
  1: 'eth-mainnet',
  3: 'eth-ropsten',
  4: 'eth-rinkeby',
  5: 'eth-goerli',
  42: 'poa-kovan',
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
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
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
