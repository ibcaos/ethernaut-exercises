import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';
import "solidity-docgen";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ]
  },
  namedAccounts: {
    deployer: 0
  },
  gasReporter: {
    enabled: process.env.GAS_REPORTER_STATUS === 'true',
    currency: process.env.GAS_REPORTER_CURRENCY,
    gasPrice: Number(process.env.GAS_REPORTER_GAS_PRICE),
    token: process.env.GAS_REPORTER_TOKEN,
    outputFile: process.env.GAS_REPORTER_OUTPUT_REPORT,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    noColors: process.env.GAS_REPORTERS_COLORS === 'true',
    showTimeSpent: process.env.GAS_REPORTERS_TIMESPENT === 'true',
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    bscTestnet: {
      url: process.env.BNB_TESTNET_RPC_URL,
      chainId: 97,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      chainId: 80001,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`,`0x${process.env.ATTACKER_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
  },
};

export default config;