/**
 * Exercise 3: Deploy Multiple Interdependent Contracts - SOLUTION
 * ================================================================
 *
 * This is the complete solution for deploying multiple contracts
 * with dependencies.
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

export const CONFIG = {
  token: {
    name: "MarketToken",
    symbol: "MKT",
    initialSupply: 1000000,
  },
};

export async function main() {
  console.log("Starting multi-contract deployment...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log(
    "Balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH\n"
  );

  // Object to store all deployed addresses
  const deployed: {
    SimpleToken?: string;
    PriceOracle?: string;
    NFTMarketplace?: string;
  } = {};

  // ============================================
  // STEP 1: Deploy SimpleToken
  // ============================================
  console.log("Step 1: Deploying SimpleToken...");

  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const token = await SimpleToken.deploy(
    CONFIG.token.name,
    CONFIG.token.symbol,
    CONFIG.token.initialSupply
  );
  await token.waitForDeployment();
  deployed.SimpleToken = await token.getAddress();
  console.log("   SimpleToken deployed to:", deployed.SimpleToken);

  // ============================================
  // STEP 2: Deploy PriceOracle
  // ============================================
  console.log("\nStep 2: Deploying PriceOracle...");

  const PriceOracle = await ethers.getContractFactory("PriceOracle");
  const oracle = await PriceOracle.deploy();
  await oracle.waitForDeployment();
  deployed.PriceOracle = await oracle.getAddress();
  console.log("   PriceOracle deployed to:", deployed.PriceOracle);

  // ============================================
  // STEP 3: Deploy NFTMarketplace with token address
  // ============================================
  console.log("\nStep 3: Deploying NFTMarketplace...");

  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.deploy(deployed.SimpleToken);
  await marketplace.waitForDeployment();
  deployed.NFTMarketplace = await marketplace.getAddress();
  console.log("   NFTMarketplace deployed to:", deployed.NFTMarketplace);

  // ============================================
  // STEP 4: Configure NFTMarketplace with PriceOracle
  // ============================================
  console.log("\nStep 4: Configuring NFTMarketplace...");

  const tx = await marketplace.setPriceOracle(deployed.PriceOracle);
  await tx.wait();
  console.log("   PriceOracle configured in NFTMarketplace");

  // ============================================
  // STEP 5: Verify all connections
  // ============================================
  console.log("\nStep 5: Verifying contract connections...");

  const paymentToken = await marketplace.paymentToken();
  console.log(
    "   Payment Token:",
    paymentToken.toLowerCase() === deployed.SimpleToken!.toLowerCase()
      ? "[OK]"
      : "[FAIL]"
  );

  const oracleAddr = await marketplace.priceOracle();
  console.log(
    "   Price Oracle:",
    oracleAddr.toLowerCase() === deployed.PriceOracle!.toLowerCase()
      ? "[OK]"
      : "[FAIL]"
  );

  // ============================================
  // STEP 6: Save all deployment info
  // ============================================
  const deploymentInfo = {
    contracts: deployed,
    deployer: deployer.address,
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    timestamp: new Date().toISOString(),
    configuration: {
      token: CONFIG.token,
      marketplace: {
        paymentToken: deployed.SimpleToken,
        priceOracle: deployed.PriceOracle,
      },
    },
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "all-contracts.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nAll deployment info saved to deployments/all-contracts.json");

  // ============================================
  // Summary
  // ============================================
  console.log("\n" + "=".repeat(50));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(50));
  console.log("SimpleToken:    ", deployed.SimpleToken);
  console.log("PriceOracle:    ", deployed.PriceOracle);
  console.log("NFTMarketplace: ", deployed.NFTMarketplace);
  console.log("=".repeat(50));

  console.log("\nMulti-contract deployment complete!");
}

// Only run if executed directly (not imported)
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Deployment failed:", error);
      process.exit(1);
    });
}
