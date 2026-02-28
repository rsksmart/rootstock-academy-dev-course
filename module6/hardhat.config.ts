import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat default dev key

// RPC URLs
const RSK_TESTNET_RPC =
  process.env.RSK_TESTNET_RPC || "https://public-node.testnet.rsk.co";

const RSK_MAINNET_RPC =
  process.env.RSK_MAINNET_RPC || "https://public-node.rsk.co";

const config: HardhatUserConfig = {
  // ============================================
  // Solidity Compiler Configuration
  // ============================================
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  // ============================================
  // Network Configuration
  // ============================================
  networks: {
    // In-memory Hardhat network
    hardhat: {
      chainId: 31337
    },

    // Local node (npx hardhat node)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },

    // RSK Testnet
    rskTestnet: {
      url: RSK_TESTNET_RPC,
      chainId: 31,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gasPrice: 60000000 // 0.06 gwei (RSK standard)
    },

    // RSK Mainnet
    rskMainnet: {
      url: RSK_MAINNET_RPC,
      chainId: 30,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gasPrice: 60000000
    }
  },

  // ============================================
  // Project Structure
  // ============================================
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  // ============================================
  // Gas Reporter
  // ============================================
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD"
  }
};

export default config;