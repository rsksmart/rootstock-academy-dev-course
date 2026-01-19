/**
 * Exercise 4: Network Configuration
 * ==================================
 * 
 * In this exercise, you will configure Hardhat to work with multiple networks.
 * 
 * Tasks:
 * 1. Configure the localhost network (for local development)
 * 2. Configure RSK Testnet network with correct RPC URL
 * 3. Configure RSK Mainnet network with correct RPC URL
 * 4. Set up account management using environment variables
 * 5. Configure the Solidity compiler version
 * 
 * Documentation:
 * - Hardhat Config: https://hardhat.org/hardhat-runner/docs/config
 * - RSK Networks: https://developers.rsk.co/rsk/node/configure/
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
    // ============================================
    // TODO 1: Configure Solidity compiler
    // Use version 0.8.20 or higher
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
    // TODO 2: Configure networks
    // Add configurations for:
    // - localhost (default Hardhat node)
    // - rskTestnet (RSK Testnet)
    // - rskMainnet (RSK Mainnet)
    // ============================================
    networks: {
        // Hardhat's built-in network (used by default)
        hardhat: {
            chainId: 31337
        },

        // TODO: Configure localhost network
        // localhost: {
        //     url: "http://127.0.0.1:8545",
        //     chainId: 31337
        // },

        // TODO: Configure RSK Testnet
        // rskTestnet: {
        //     url: RSK_TESTNET_RPC,
        //     chainId: 31,
        //     accounts: [PRIVATE_KEY],
        //     gasPrice: 60000000  // 0.06 gwei - RSK uses lower gas prices
        // },

        // TODO: Configure RSK Mainnet
        // rskMainnet: {
        //     url: RSK_MAINNET_RPC,
        //     chainId: 30,
        //     accounts: [PRIVATE_KEY],
        //     gasPrice: 60000000
        // }
    },

    // ============================================
    // TODO 3: Configure paths (optional but recommended)
    // ============================================
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },

    // ============================================
    // Gas Reporter configuration (optional)
    // ============================================
    gasReporter: {
        enabled: process.env.REPORT_GAS === "true",
        currency: "USD"
    }
};

export default config;
