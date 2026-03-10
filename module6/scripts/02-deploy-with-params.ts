import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

export const CONFIG = {
  tokenName: "RootstockToken",
  tokenSymbol: "RSK",
  initialSupply: 500000,
};

export async function main() {
  const [deployer] = await ethers.getSigners();

  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  const token = await SimpleToken.deploy(
    CONFIG.tokenName,
    CONFIG.tokenSymbol,
    CONFIG.initialSupply
  );

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();

  const deployedName = await token.name();
  const deployedSymbol = await token.symbol();
  const deployedSupply = await token.totalSupply();
  const decimals = await token.decimals();

  const expectedSupply =
    BigInt(CONFIG.initialSupply) * BigInt(10 ** Number(decimals));

  const deployerBalance = await token.balanceOf(deployer.address);

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
    },
    timestamp: new Date().toISOString(),
    network: network.name,
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "SimpleToken-custom.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}