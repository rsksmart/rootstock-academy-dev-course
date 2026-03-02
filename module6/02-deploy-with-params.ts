/**
 * Exercise 2: Deployment with Constructor Parameters
 * ===================================================
 *
 * In this exercise, you will deploy a contract using custom
 * parameters and verify they were set correctly.
 *
 * Tasks:
 * 1. Accept deployment parameters from configuration
 * 2. Deploy SimpleToken with custom name, symbol, and supply
 * 3. Verify the parameters were set correctly by reading contract state
 * 4. Save deployment info including the parameters used
 *
 * Run with: npx hardhat run scripts/02-deploy-with-params.ts
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

// Deployment configuration - I can modify these values
export const CONFIG = {
  tokenName: "MichaelToken",  // I changed this from "RootstockToken"
  tokenSymbol: "MIKE",        // I changed this from "RSK"
  initialSupply: 1000000,      // I changed this from 500000 (1 million tokens)
};

export async function main() {
  console.log("Starting deployment with custom parameters...\n");
  console.log("Configuration:");
  console.log("   Name:", CONFIG.tokenName);
  console.log("   Symbol:", CONFIG.tokenSymbol);
  console.log(
    "   Initial Supply:",
    CONFIG.initialSupply.toLocaleString(),
    "tokens\n"
  );

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // ============================================
  // TODO 1: Get the contract factory for SimpleToken
  // I added this line
  // ============================================
  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  // ============================================
  // TODO 2: Deploy with CONFIG parameters
  // I added this line - passing name, symbol, and supply from CONFIG
  // ============================================
  const token = await SimpleToken.deploy(CONFIG.tokenName, CONFIG.tokenSymbol, CONFIG.initialSupply);

  // ============================================
  // TODO 3: Wait for deployment
  // I added these lines
  // ============================================
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // ============================================
  // TODO 4: Verify parameters by reading contract state
  // I added all the verification code below
  // ============================================
  console.log("\nVerifying deployment parameters...");

  const deployedName = await token.name();
  const deployedSymbol = await token.symbol();
  const deployedSupply = await token.totalSupply();
  const decimals = await token.decimals();

  console.log("   Name:", deployedName, deployedName === CONFIG.tokenName ? "[OK]" : "[FAIL]");
  console.log("   Symbol:", deployedSymbol, deployedSymbol === CONFIG.tokenSymbol ? "[OK]" : "[FAIL]");

  // Expected supply in wei (with decimals)
  const expectedSupply = BigInt(CONFIG.initialSupply) * BigInt(10 ** Number(decimals));
  console.log("   Total Supply:", ethers.formatUnits(deployedSupply, decimals), "tokens",
      deployedSupply === expectedSupply ? "[OK]" : "[FAIL]");

  // ============================================
  // TODO 5: Check deployer received the tokens
  // I added this verification
  // ============================================
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log("   Deployer Balance:", ethers.formatUnits(deployerBalance, decimals), "tokens",
      deployerBalance === expectedSupply ? "[OK]" : "[FAIL]");

  // ============================================
  // TODO 6: Save deployment info WITH parameters
  // I uncommented and filled in the deploymentInfo object
  // ============================================
  const deploymentInfo = {
    address: tokenAddress,
    deployer: deployer.address,
    parameters: {
        name: CONFIG.tokenName,
        symbol: CONFIG.tokenSymbol,
        initialSupply: CONFIG.initialSupply
    },
    verified: {
        name: deployedName,
        symbol: deployedSymbol,
        totalSupply: deployedSupply.toString()
    },
    timestamp: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // I uncommented these lines to save the file
  fs.writeFileSync(
      path.join(deploymentsDir, "SimpleToken-custom.json"),
      JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nDeployment info saved to deployments/SimpleToken-custom.json");

  console.log("\nDeployment with parameters complete!");
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