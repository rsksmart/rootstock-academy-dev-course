import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

export async function main() {
  const [deployer] = await ethers.getSigners();

  const SimpleToken = await ethers.getContractFactory("SimpleToken");

  const token = await SimpleToken.deploy("SimpleToken", "STK", 1000000);

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();

  const network = await ethers.provider.getNetwork();

  const deploymentInfo = {
    address: tokenAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    network: network.name,
    chainId: Number(network.chainId)
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "SimpleToken.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}