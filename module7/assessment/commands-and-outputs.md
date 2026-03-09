# Module 7 Assessment - Smart Contract Verification

## Commands Run and Outputs

### 1) Compile

```bash
npx hardhat compile
```

Output:

```text
Nothing to compile
No need to generate any newer typings.
```

### 2) Local deployment validation (Hardhat network)

```bash
npx hardhat run scripts/03-deploy-multiple.ts
```

Output summary:

```text
SimpleToken deployed to:    0x5FbDB2315678afecb367f032d93F642f64180aa3
PriceOracle deployed to:    0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
NFTMarketplace deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Payment Token: [OK]
Price Oracle: [OK]
```

### 3) Flatten files for verification

```bash
npx hardhat flatten contracts/SimpleToken.sol > SimpleToken-flat.sol
npx hardhat flatten contracts/PriceOracle.sol > PriceOracle-flat.sol
npx hardhat flatten contracts/NFTMarketplace.sol > NFTMarketplace-flat.sol
```

Generated files:

```text
SimpleToken-flat.sol
PriceOracle-flat.sol
NFTMarketplace-flat.sol
```

### 4) Rootstock Testnet deployment

```bash
npx hardhat run scripts/03-deploy-multiple.ts --network rskTestnet
```

Result:

```text
SimpleToken deployed to:    0x11896863DEeA82cD88BC77879225c4Eb6eB557A0
PriceOracle deployed to:    0x5E53B6479b232a45d8218FEC3Fccf5236a5AB2D0
NFTMarketplace deployed to: 0x3D78dfBed5D19A95261D9A3425B6756519750072
Payment Token: [OK]
Price Oracle: [OK]
```

---

## (1) Verified Contract URLs

RSK Testnet Explorer URLs for each verified contract:

### SimpleToken
```text
https://explorer.testnet.rootstock.io/address/0x11896863DEeA82cD88BC77879225c4Eb6eB557A0?tab=contract
```

### PriceOracle
```text
https://explorer.testnet.rootstock.io/address/0x5E53B6479b232a45d8218FEC3Fccf5236a5AB2D0?tab=contract
```

### NFTMarketplace
```text
https://explorer.testnet.rootstock.io/address/0x3D78dfBed5D19A95261D9A3425B6756519750072?tab=contract
```

---

## (2) Screenshot - Verification Form

Add a screenshot of the Rootstock Testnet Explorer verification form for one contract.

![Verification Form Screenshot](./screenshot-verification-form.png)

---

## (3) Screenshot - Verified Code Tab

Add a screenshot of the verified "Code" tab for one contract.

![Verified Code Screenshot](./screenshot-verified-code.png)

---

## Notes

```text
Module 7 scripts and config are complete and validated locally.
Flattened files are generated.
Contracts are deployed to rskTestnet and all three are verified on Rootstock Explorer.
```
