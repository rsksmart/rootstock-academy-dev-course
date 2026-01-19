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
  // Hint: Use ethers.getContractFactory("ContractName")
  // ============================================
  // const SimpleToken = ...

  // ============================================
  // TODO 2: Deploy the contract
  // The SimpleToken constructor takes: name, symbol, initialSupply
  // Use: "SimpleToken", "STK", 1000000 as parameters
  // Hint: Use the deploy() method on the factory
  // ============================================
  // const token = ...

  // ============================================
  // TODO 3: Wait for deployment to complete
  // Hint: Use waitForDeployment() method
  // ============================================
  // await ...

  // ============================================
  // TODO 4: Get and log the contract address
  // Hint: Use token.target or await token.getAddress()
  // ============================================
  // const tokenAddress = ...
  // console.log("SimpleToken deployed to:", tokenAddress);

  // ============================================
  // TODO 5: Save deployment information
  // Create a deployments folder if it doesn't exist
  // Save a JSON file with: address, deployer, timestamp, network
  // ============================================
  const deploymentInfo = {
    // address: tokenAddress,
    // deployer: deployer.address,
    // timestamp: new Date().toISOString(),
    // network: (await ethers.provider.getNetwork()).name,
    // chainId: Number((await ethers.provider.getNetwork()).chainId)
  };

  // Create deployments directory
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save to file
  // fs.writeFileSync(
  //     path.join(deploymentsDir, "SimpleToken.json"),
  //     JSON.stringify(deploymentInfo, null, 2)
  // );
  // console.log("Deployment info saved to deployments/SimpleToken.json");

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
