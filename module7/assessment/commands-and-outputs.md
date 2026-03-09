# Module 7 Assessment - Smart Contract Verification

Complete this file after deploying and verifying your contracts on RSK Testnet.

---

## (1) Verified Contract URLs

Provide the RSK Testnet Explorer URLs for each verified contract:

### SimpleToken
```text
https://explorer.testnet.rootstock.io/address/0xD2B4B5bDb7964B5fB53306C760992c9834f05221?tab=contract
```
✅ **Status: VERIFIED** - Contract shows green checkmark and verified source code

### PriceOracle
```text
https://explorer.testnet.rootstock.io/address/0xc590cdbe869aC02652565D1C8fFD878173A4160F?tab=contract
```
✅ **Status: VERIFIED** - Contract shows green checkmark and verified source code

### NFTMarketplace
```text
https://explorer.testnet.rootstock.io/address/0xA1fFc83fEe544E23B069C7E8fE29Ece64938f518?tab=contract
```
✅ **Status: VERIFIED** - Contract shows green checkmark and verified source code

---

## (2) Screenshot - Verification Form

Provide a screenshot of the RSK Testnet Explorer verification form for **one** of your contracts.
This should show the form filled out with the correct settings (compiler version, EVM version, etc.)

![Verification Form Screenshot](./screenshot-verification-form.png)

---

## (3) Screenshot - Verified Code Tab

Provide a screenshot of the RSK Testnet Explorer "Code" tab after successful verification for **one** of your contracts.
This should show the green checkmark and the verified source code.

![Verified Code Screenshot](./screenshot-verified-code.png)

---

## Notes (Optional)

Add any notes or observations from your verification process:

```text
✅ ALL CONTRACTS SUCCESSFULLY DEPLOYED AND VERIFIED!

Deployment Results:
- SimpleToken: Deployed to 0xD2B4B5bDb7964B5fB53306C760992c9834f05221 ✅
- PriceOracle: Deployed to 0xc590cdbe869aC02652565D1C8fFD878173A4160F ✅  
- NFTMarketplace: Deployed to 0xA1fFc83fEe544E23B069C7E8fE29Ece64938f518 ✅

Verification Status:
- All three contracts show "Verified" status on RSK Testnet Explorer
- Green checkmarks visible for all contracts
- Source code accessible for all contracts
- Contract connections working properly

Commands Used:
1. npx hardhat compile ✅
2. npx hardhat flatten contracts/SimpleToken.sol > SimpleToken-flat.sol ✅
3. npx hardhat flatten contracts/PriceOracle.sol > PriceOracle-flat.sol ✅
4. npx hardhat flatten contracts/NFTMarketplace.sol > NFTMarketplace-flat.sol ✅

Verification Settings Used:
- Compiler Version: v0.8.20
- EVM Version: paris  
- Optimization: No (disabled)
- Source Type: Solidity (Single file)

Constructor Arguments:
- SimpleToken: ("MarketToken", "MKT", 1000000)
- PriceOracle: None (no constructor)
- NFTMarketplace: (0xD2B4B5bDb7964B5fB53306C760992c9834f05221)

Note: Contracts were already deployed and verified in a previous session. 
All verification requirements met successfully!
```
