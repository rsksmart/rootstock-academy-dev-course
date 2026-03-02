/**
 * Exercise 1: Basic Deployment Script
 * ====================================
 *
 * In this exercise, you will learn to deploy a simple smart contract
 * using Hardhat and save the deployment information.
 *
 * Tasks:
 * 1. Get the contract factory for SimpleToken
 * 2. Deploy the contract with basic parameters
 * 3. Wait for deployment confirmation
 * 4. Log the deployed address
 * 5. Save deployment info to a JSON file
 *
 * Run with: npx hardhat run scripts/01-deploy-simple.ts
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
  // TODO 1: Get the contract factory
  // I used ethers.getContractFactory to get the factory for SimpleToken
  // ============================================
  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  // ============================================
  // TODO 2: Deploy the contract
  // I deployed SimpleToken with name "SimpleToken", symbol "STK", and initial supply 1000000
  // ============================================
  const token = await SimpleToken.deploy("SimpleToken", "STK", 1000000);

  // ============================================
  // TODO 3: Wait for deployment to complete
  // I used waitForDeployment() to wait for the transaction to be confirmed
  // ============================================
  await token.waitForDeployment();

  // ============================================
  // TODO 4: Get and log the contract address
  // I used getAddress() to get the deployed contract address and logged it
  // ============================================
  const tokenAddress = await token.getAddress();
  console.log("SimpleToken deployed to:", tokenAddress);

  // ============================================
  // TODO 5: Save deployment information
  // I created a deploymentInfo object with address, deployer, timestamp, network, and chainId
  // Then I saved it to deployments/SimpleToken.json
  // ============================================
  const deploymentInfo = {
    address: tokenAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId)
  };

  // Create deployments directory if it doesn't exist
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