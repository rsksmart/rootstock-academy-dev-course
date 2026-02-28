/**
 * Exercise 2: Deployment with Constructor Parameters
 * ===================================================
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

export const CONFIG = {
  tokenName: "RootstockToken",
  tokenSymbol: "RSK",
  initialSupply: 500000,
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
  // 1. Get contract factory
  // ============================================
  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  // ============================================
  // 2. Deploy with CONFIG parameters
  // ============================================
  const token = await SimpleToken.deploy(
    CONFIG.tokenName,
    CONFIG.tokenSymbol,
    CONFIG.initialSupply
  );

  // ============================================
  // 3. Wait for deployment
  // ============================================
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // ============================================
  // 4. Verify parameters
  // ============================================
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

  const expectedSupply =
    BigInt(CONFIG.initialSupply) *
    BigInt(10) ** BigInt(Number(decimals));

  console.log(
    "   Total Supply:",
    ethers.formatUnits(deployedSupply, decimals),
    "tokens",
    deployedSupply === expectedSupply ? "[OK]" : "[FAIL]"
  );

  // ============================================
  // 5. Verify deployer balance
  // ============================================
  const deployerBalance = await token.balanceOf(deployer.address);

  console.log(
    "   Deployer Balance:",
    ethers.formatUnits(deployerBalance, decimals),
    "tokens",
    deployerBalance === expectedSupply ? "[OK]" : "[FAIL]"
  );

  // ============================================
  // 6. Save deployment info with parameters
  // ============================================
  const network = await ethers.provider.getNetwork();

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
      decimals: Number(decimals),
    },
    timestamp: new Date().toISOString(),
    network: network.name,
    chainId: Number(network.chainId),
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "SimpleToken-custom.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(
    "\nDeployment info saved to deployments/SimpleToken-custom.json"
  );

  console.log("\nDeployment with parameters complete!");
}

// Only run if executed directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Deployment failed:", error);
      process.exit(1);
    });
}