
/**
 * Exercise 1: Basic Deployment Script
 * ====================================
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

export async function main() {
  console.log("Starting SimpleToken deployment...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  // ============================================
  // 1. Get the contract factory
  // ============================================
  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  // ============================================
  // 2. Deploy the contract
  // Constructor: (name, symbol, initialSupply)
  // ============================================
  const token = await SimpleToken.deploy(
    "SimpleToken",
    "STK",
    1_000_000
  );

  // ============================================
  // 3. Wait for deployment confirmation
  // ============================================
  await token.waitForDeployment();

  // ============================================
  // 4. Get and log the contract address
  // ============================================
  const tokenAddress = await token.getAddress();
  console.log("SimpleToken deployed to:", tokenAddress);

  // ============================================
  // 5. Save deployment information
  // ============================================
  const network = await ethers.provider.getNetwork();

  const deploymentInfo = {
    address: tokenAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    network: network.name,
    chainId: Number(network.chainId)
  };

  // Create deployments directory
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save to file
  fs.writeFileSync(
    path.join(deploymentsDir, "SimpleToken.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployments/SimpleToken.json");
  console.log("\nDeployment complete!");
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