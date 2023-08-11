import { providers, Contract, BigNumber } from 'ethers'
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/optimism")
// using QUICKNODE rpc PROVIDER

const BTC_USD_RATE_ADDRESS = '0xD702DD976Fb76Fffc2D3963D037dfDae5b04E593';
const ETH_USD_RATE_ADDRESS = "0x13e3Ee699D1909E989722E753853AE30b17e08c5";
const EUR_USD_RATE_ADDRESS = "0x3626369857A10CcC6cc3A6e4f5C2f5984a519F20";

const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ]

export function getLatestPrice(): Promise<BigNumber[]> {
    const priceFeed = new ethers.Contract(ETH_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
  return priceFeed.latestRoundData()
}

export function getLatestPricebtc(): Promise<BigNumber[]> {
  const priceFeed = new ethers.Contract(BTC_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
return priceFeed.latestRoundData()
}

export function getLatestPriceeur(): Promise<BigNumber[]> {
  const priceFeed = new ethers.Contract(EUR_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
return priceFeed.latestRoundData()
}

