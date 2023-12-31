require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('./tasks');
require('hardhat-contract-sizer');

const { privateKey } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    moonbeam: {
      url: 'https://moonbeam.public.blastapi.io',
      chainId: 1284,
      accounts: [privateKey]
    },
    moonbase: {
      url: 'https://moonbase-alpha.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da',
      chainId: 1287, // 0x507 in hex,
      accounts: [privateKey],
      gasPrice: 200000000
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [privateKey]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 5,
      accounts: [privateKey]
    },
    'bsc-testnet': {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      accounts: [privateKey]
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: [privateKey]
    },
    'arbitrum-goerli': {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: [privateKey]
    },
    'optimism-goerli': {  
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: [privateKey],
      gasPrice: 1000000000
    },
    'fantom-testnet': {
      url: `https://fantom-testnet.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da`,
      chainId: 4002,
      accounts: [privateKey]
    },
    'dev-node': {
      url: 'http://127.0.0.1:9933',
      chainId: 1281,
      accounts: ["0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342"]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },
  // etherscan: etherscanApiKeys,
};
