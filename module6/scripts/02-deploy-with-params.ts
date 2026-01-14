/**
 * Exercise 2: Deployment with Constructor Parameters - SOLUTION
 * =============================================================
 *
 * This is the complete solution for deployment with custom parameters.
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

// Deployment configuration
export const CONFIG = {
  tokenName: "RootstockToken",
  tokenSymbol: "RSK",
  initialSupply: 500000, // 500,000 tokens
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

  // TODO 1: Get the contract factory for SimpleToken
  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  // TODO 2: Deploy with CONFIG parameters
  console.log("Deploying token with custom parameters...");
  const token = await SimpleToken.deploy(
    CONFIG.tokenName,
    CONFIG.tokenSymbol,
    CONFIG.initialSupply
  );

  // TODO 3: Wait for deployment
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // TODO 4: Verify parameters by reading contract state
  console.log("\nVerifying deployment parameters...");

  const deployedName = await token.name();
  const deployedSymbol = await token.symbol();
  const deployedSupply = await token.totalSupply();
  const decimals = await token.decimals();

  console.log(
    "   Name:",
    deployedName,
    deployedName === CONFIG.tokenName ? "[OK]" : "[FAIL]"
  );
  console.log(
    "   Symbol:",
    deployedSymbol,
    deployedSymbol === CONFIG.tokenSymbol ? "[OK]" : "[FAIL]"
  );

  // Expected supply in wei (with decimals)
  const expectedSupply =
    BigInt(CONFIG.initialSupply) * BigInt(10 ** Number(decimals));
  console.log(
    "   Total Supply:",
    ethers.formatUnits(deployedSupply, decimals),
    "tokens",
    deployedSupply === expectedSupply ? "[OK]" : "[FAIL]"
  );

  // TODO 5: Check deployer received the tokens
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log(
    "   Deployer Balance:",
    ethers.formatUnits(deployerBalance, decimals),
    "tokens",
    deployerBalance === expectedSupply ? "[OK]" : "[FAIL]"
  );

  // TODO 6: Save deployment info WITH parameters
  const deploymentInfo = {
    address: tokenAddress,
    deployer: deployer.address,
    parameters: {
      name: CONFIG.tokenName,
      symbol: CONFIG.tokenSymbol,
      initialSupply: CONFIG.initialSupply,
    },
    verified: {
      name: deployedName,
      symbol: deployedSymbol,
      totalSupply: deployedSupply.toString(),
    },
    timestamp: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

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
