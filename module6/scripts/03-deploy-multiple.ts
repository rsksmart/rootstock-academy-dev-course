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
  const [deployer] = await ethers.getSigners();

  const deployed: {
    SimpleToken?: string;
    PriceOracle?: string;
    NFTMarketplace?: string;
  } = {};

  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const token = await SimpleToken.deploy(
    CONFIG.token.name,
    CONFIG.token.symbol,
    CONFIG.token.initialSupply
  );
  await token.waitForDeployment();
  deployed.SimpleToken = await token.getAddress();

  const PriceOracle = await ethers.getContractFactory("PriceOracle");
  const oracle = await PriceOracle.deploy();
  await oracle.waitForDeployment();
  deployed.PriceOracle = await oracle.getAddress();

  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.deploy(deployed.SimpleToken);
  await marketplace.waitForDeployment();
  deployed.NFTMarketplace = await marketplace.getAddress();

  const tx = await marketplace.setPriceOracle(deployed.PriceOracle);
  await tx.wait();

  const paymentToken = await marketplace.paymentToken();
  const oracleAddr = await marketplace.priceOracle();

  const network = await ethers.provider.getNetwork();

  const deploymentInfo = {
    contracts: deployed,
    deployer: deployer.address,
    network: network.name,
    chainId: Number(network.chainId),
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
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}