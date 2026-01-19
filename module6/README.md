# Module 6 - Smart Contract Deployment

## Overview

This module teaches students how to deploy smart contracts using Hardhat, configure networks, and manage deployment scripts. Students will learn deployment best practices and automation techniques.

**Estimated duration**: 3-4 hours  
**Level**: Intermediate  
**Prerequisites**: Module 4 completed (Testing)

## Learning Objectives

By the end of this module, students will be able to:

1. Write deployment scripts using Hardhat
2. Configure multiple networks (local, testnet, mainnet)
3. Manage environment variables securely
4. Deploy contracts with constructor parameters
5. Deploy multiple interdependent contracts
6. Save and manage deployment artifacts

## Structure

```
module6/
├── contracts/
│   ├── SimpleToken.sol           # Basic ERC20 for deployment
│   ├── NFTMarketplace.sol        # Complex contract with dependencies
│   └── PriceOracle.sol           # Contract for oracle functionality
├── scripts/
│   ├── 01-deploy-simple.ts       # ❌ INCOMPLETE - Basic deployment
│   ├── 02-deploy-with-params.ts  # ❌ INCOMPLETE - Constructor params
│   └── 03-deploy-multiple.ts     # ❌ INCOMPLETE - Multiple contracts
├── hardhat.config.ts             # ❌ INCOMPLETE - Network configuration
├── deployments/                  # 📁 Generated deployment artifacts
└── README.md
```

## Exercises

### Exercise 1: Basic Deployment Script
**File**: `scripts/01-deploy-simple.ts`

Your first deployment! Learn the fundamentals of deploying a contract.

**Tasks:**
- [ ] Get the contract factory for `SimpleToken`
- [ ] Deploy the contract with parameters: `"SimpleToken"`, `"STK"`, `1000000`
- [ ] Wait for deployment confirmation
- [ ] Log the deployed address
- [ ] Save deployment info to `deployments/SimpleToken.json`

**Run with:**
```bash
npx hardhat run scripts/01-deploy-simple.ts
```

---

### Exercise 2: Deployment with Constructor Parameters
**File**: `scripts/02-deploy-with-params.ts`

Deploy contracts with custom configuration and verify the parameters.

**Tasks:**
- [ ] Deploy `SimpleToken` with custom name, symbol, and supply
- [ ] Verify parameters were set correctly by reading contract state
- [ ] Check deployer received the initial supply
- [ ] Save deployment info including parameters used

**Run with:**
```bash
npx hardhat run scripts/02-deploy-with-params.ts
```

---

### Exercise 3: Deploy Multiple Interdependent Contracts
**File**: `scripts/03-deploy-multiple.ts`

Deploy a complete system of contracts that depend on each other.

**Tasks:**
- [ ] Deploy `SimpleToken` first (no dependencies)
- [ ] Deploy `PriceOracle` (no dependencies)
- [ ] Deploy `NFTMarketplace` with `SimpleToken` address as parameter
- [ ] Configure `NFTMarketplace` with `PriceOracle` address
- [ ] Verify all contracts are properly connected
- [ ] Save all addresses in `deployments/all-contracts.json`

**Run with:**
```bash
npx hardhat run scripts/03-deploy-multiple.ts
```

---

### Exercise 4: Network Configuration
**File**: `hardhat.config.ts`

Configure Hardhat to work with RSK networks.

**Tasks:**
- [ ] Set up environment variable for private key
- [ ] Configure `localhost` network for local development
- [ ] Configure `rskTestnet` network with correct RPC URL
- [ ] Configure `rskMainnet` network with correct RPC URL
- [ ] Set appropriate gas prices for RSK networks

**RSK Network Details:**
| Network | Chain ID | RPC URL |
|---------|----------|---------|
| RSK Testnet | 31 | https://public-node.testnet.rsk.co |
| RSK Mainnet | 30 | https://public-node.rsk.co |

---

## Getting Started

### 1. Install Dependencies

```bash
cd module6
npm install
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Run Deployment Scripts

```bash
# Exercise 1: Basic deployment
npx hardhat run scripts/01-deploy-simple.ts

# Exercise 2: Deploy with parameters
npx hardhat run scripts/02-deploy-with-params.ts

# Exercise 3: Deploy multiple contracts
npx hardhat run scripts/03-deploy-multiple.ts
```

### 4. Deploy to RSK Testnet (Optional)

First, get some tRBTC from the [RSK Testnet Faucet](https://faucet.rsk.co/).

```bash
# Create .env file with your private key
cp .env.example .env
# Edit .env and add your private key

# Deploy to testnet
npx hardhat run scripts/01-deploy-simple.ts --network rskTestnet
```

---

## Expected Output

After completing all exercises, your `deployments/` folder should contain:

```
deployments/
├── SimpleToken.json
├── SimpleToken-custom.json
└── all-contracts.json
```

Each JSON file should include:
- Contract address
- Deployer address
- Network information
- Timestamp
- Constructor parameters (where applicable)

---

## Hints

### Getting Contract Factory
```typescript
const MyContract = await ethers.getContractFactory("ContractName");
```

### Deploying a Contract
```typescript
const contract = await MyContract.deploy(arg1, arg2);
await contract.waitForDeployment();
const address = await contract.getAddress();
```

### Reading Contract State
```typescript
const value = await contract.someFunction();
```

### Saving to File
```typescript
import * as fs from "fs";
fs.writeFileSync("path/file.json", JSON.stringify(data, null, 2));
```

---

## Success Criteria

Your submission passes when:
- ✅ All deployment scripts execute without errors
- ✅ Deployment artifacts are created in `deployments/`
- ✅ JSON files contain valid contract addresses
- ✅ Network configuration is valid for RSK
- ✅ All validation tests pass

---

## Additional Resources

- [Hardhat Deployment Guide](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- [Hardhat Network Configuration](https://hardhat.org/hardhat-runner/docs/config#networks-configuration)
- [RSK Developer Portal](https://developers.rsk.co/)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)

---

## Submissions

Create a PR with title `module6/your-username` containing:
- Completed deployment scripts in `scripts/`
- Updated `hardhat.config.ts` with network configurations

The PR will be automatically reviewed by the RSK Developer Education team.
