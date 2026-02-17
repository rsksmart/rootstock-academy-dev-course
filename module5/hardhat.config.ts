import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version : "0.8.24",
    settings: {
      evmVersion: "cancun", // <--- Add or update this line
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
