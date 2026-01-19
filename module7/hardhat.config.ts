/**
 * Exercise 4: Network Configuration - SOLUTION
 * =============================================
 * 
 * This is the complete solution for network configuration.
 */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat default key #0

// 2: Define RPC URLs
const RSK_TESTNET_RPC = process.env.RSK_TESTNET_RPC || "https://public-node.testnet.rsk.co";
const RSK_MAINNET_RPC = process.env.RSK_MAINNET_RPC || "https://public-node.rsk.co";

const config: HardhatUserConfig = {
    // TODO 1: Configure Solidity compiler
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: false,
                runs: 200
            }
        }
    },

    // TODO 2: Configure networks
    networks: {
        // Hardhat's built-in network (used by default)
        hardhat: {
            chainId: 31337
        },

        // Localhost network (for local Hardhat node)
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337
        },

        // RSK Testnet configuration
        rskTestnet: {
            url: RSK_TESTNET_RPC,
            chainId: 31,
            accounts: [PRIVATE_KEY],
            gasPrice: 60000000  // 0.06 gwei - RSK uses lower gas prices
        },

        // RSK Mainnet configuration
        rskMainnet: {
            url: RSK_MAINNET_RPC,
            chainId: 30,
            accounts: [PRIVATE_KEY],
            gasPrice: 60000000
        }
    },

    // TODO 3: Configure paths
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },

    // Gas Reporter configuration
    gasReporter: {
        enabled: process.env.REPORT_GAS === "true",
        currency: "USD"
    }
};

export default config;
