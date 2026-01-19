# Module 7 - Smart Contract Verification

## Overview

This module teaches students how to verify smart contracts on the Rootstock Explorer. Contract verification is essential for transparency and allows users to interact directly with your contracts through the explorer interface and CLI.

**Estimated duration**: 2-3 hours  
**Level**: Intermediate  
**Prerequisites**: Module 6 completed (Deployment)

## Learning Objectives

By the end of this module, students will be able to:

1. Deploy smart contracts to Rootstock Testnet
2. Understand the importance of contract verification
3. Use Hardhat flatten to prepare source code for verification
4. Verify contracts on the Rootstock Explorer
5. Handle constructor arguments during verification

---

## Verified Examples (Reference)

These are example verified contracts you can reference:

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| SimpleToken | `0xeb08beae69e2ab91724d5a1249ed84656b4b2d8e` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xeb08beae69e2ab91724d5a1249ed84656b4b2d8e?tab=contract) |
| SimpleToken (with params) | `0x8c45ffec995fdb194ac06aeb48781dacd2d39df2` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0x8c45ffec995fdb194ac06aeb48781dacd2d39df2?tab=contract) |
| PriceOracle | `0xc590cdbe869ac02652565d1c8ffd878173a4160f` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xc590cdbe869ac02652565d1c8ffd878173a4160f?tab=contract) |
| NFTMarketplace | `0xa1ffc83fee544e23b069c7e8fe29ece64938f518` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xa1ffc83fee544e23b069c7e8fe29ece64938f518?tab=contract) |

---

## Verification Tips

When verifying contracts on the Rootstock Testnet Explorer, ensure you use:

| Setting | Value |
|---------|-------|
| **Source Type** | Solidity (Single file) |
| **Compiler Version** | `0.8.20` |
| **EVM Version** | Paris |
| **Optimization** | No (disabled) |

### Flatten Your Solidity Files

Use the following command to generate a single flattened source file:

```bash
npx hardhat flatten contracts/SimpleToken.sol > SimpleToken-flat.sol
npx hardhat flatten contracts/PriceOracle.sol > PriceOracle-flat.sol
npx hardhat flatten contracts/NFTMarketplace.sol > NFTMarketplace-flat.sol
```

> ⚠️ **Important**: Make sure to input the correct constructor arguments for each contract during verification.

---

## Structure

```
module7/
├── contracts/
│   ├── SimpleToken.sol           # ERC20 token contract
│   ├── PriceOracle.sol           # Oracle contract (no constructor args)
│   └── NFTMarketplace.sol        # Marketplace contract
├── scripts/
│   ├── 01-deploy-simple.ts       # Deploy SimpleToken
│   ├── 02-deploy-with-params.ts  # Deploy with custom params
│   └── 03-deploy-multiple.ts     # Deploy all contracts
├── deployments/                  # 📁 Generated deployment artifacts
├── assessment/
│   └── commands-and-outputs.md   # 📝 YOUR SUBMISSION FILE
├── hardhat.config.ts             # Network configuration
└── README.md
```

---

## Exercise: Deploy and Verify Contracts

### Step 1: Setup Environment

1. Install dependencies:
```bash
cd module7
npm install
```

2. Create your `.env` file:
```bash
cp env.example .env
```

3. Add your private key to `.env`:
```
PRIVATE_KEY=your_private_key_here
```

4. Get tRBTC from the [Rootstock Testnet Faucet](https://faucet.rsk.co/)

### Step 2: Compile Contracts

```bash
npx hardhat compile
```

### Step 3: Deploy Contracts to Rootstock Testnet

Deploy all three contracts using the multi-contract deployment script:

```bash
npx hardhat run scripts/03-deploy-multiple.ts --network rskTestnet
```

This will deploy:
- **SimpleToken** - Constructor args: `"MarketToken"`, `"MKT"`, `1000000`
- **PriceOracle** - No constructor args
- **NFTMarketplace** - Constructor arg: `<SimpleToken_address>`

> 📝 **Save the deployed addresses!** You'll need them for verification.

### Step 4: Flatten Source Files

Generate flattened source files for verification:

```bash
npx hardhat flatten contracts/SimpleToken.sol > SimpleToken-flat.sol
npx hardhat flatten contracts/PriceOracle.sol > PriceOracle-flat.sol
npx hardhat flatten contracts/NFTMarketplace.sol > NFTMarketplace-flat.sol
```

### Step 5: Verify Contracts on Rootstock Explorer

For each deployed contract:

1. Go to the [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/)
2. Search for your contract address
3. Click on the **"Contract"** tab
4. Click **"Verify Contract"**
5. Fill in the verification form:

| Field | Value |
|-------|-------|
| Contract Address | Your deployed address |
| Contract Name | `SimpleToken` / `PriceOracle` / `NFTMarketplace` |
| Compiler Version | `v0.8.20` |
| EVM Version | `paris` |
| Optimization | `No` |
| Source Code | Paste the flattened `.sol` file contents |
| Constructor Arguments | See table below |

#### Constructor Arguments

| Contract | Constructor Arguments (ABI-encoded) |
|----------|-------------------------------------|
| SimpleToken | Encode: `("MarketToken", "MKT", 1000000)` |
| PriceOracle | None (leave empty) |
| NFTMarketplace | Encode: `(<SimpleToken_address>)` |

### Step 6: Complete the Assessment

After successfully verifying all three contracts, fill in the `assessment/commands-and-outputs.md` file with:

1. The verified contract URLs
2. A screenshot of the verification form (for one contract)
3. A screenshot of the verified "Code" tab (for one contract)

---

## Success Criteria

Your submission passes when:

- ✅ All three contracts are deployed to Rootstock Testnet
- ✅ All three contracts are verified on the Rootstock Explorer
- ✅ The `assessment/commands-and-outputs.md` file contains valid Explorer URLs
- ✅ Screenshots show successful verification

---

## Additional Resources

- [Rootstock Explorer - Testnet](https://explorer.testnet.rootstock.io/)
- [Rootstock Testnet Faucet](https://faucet.rsk.co/)
- [Hardhat Flatten Documentation](https://hardhat.org/hardhat-runner/docs/advanced/flattening)
- [ABI Encoder Tool](https://abi.hashex.org/)
- [Rootstock Developer Portal](https://developers.rsk.co/)

---

## Submission

Complete the `assessment/commands-and-outputs.md` file and create a PR with title `module7/your-username` containing:

- Completed `assessment/commands-and-outputs.md`
- Screenshots in the `assessment/` folder

The PR will be automatically reviewed by the Rootstock Developer Education team.
