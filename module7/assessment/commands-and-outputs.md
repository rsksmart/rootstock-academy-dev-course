# Module 7 Assessment - Smart Contract Verification

Complete this file after deploying and verifying your contracts on RSK Testnet.

---

## (1) Verified Contract URLs

Provide the RSK Testnet Explorer URLs for each verified contract:

### SimpleToken
```text
https://explorer.testnet.rootstock.io/address/0xD2B4B5bDb7964B5fB53306C760992c9834f05221?tab=contract
```

### PriceOracle
```text
https://explorer.testnet.rootstock.io/address/0xc590cdbe869aC02652565D1C8fFD878173A4160F?tab=contract
```

### NFTMarketplace
```text
https://explorer.testnet.rootstock.io/address/0xA1fFc83fEe544E23B069C7E8fE29Ece64938f518?tab=contract
```

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
All three contracts have been successfully deployed and verified on RSK Testnet:

1. **SimpleToken (0xD2B4B5bDb7964B5fB53306C760992c9834f05221)**
   - Deployed: Jan 13 2026 18:09:41 UTC
   - Constructor Args: name="MarketToken", symbol="MKT", initialSupply=1000000
   - Verification Status: Verified (Exact Match)

2. **PriceOracle (0xc590cdbe869aC02652565D1C8fFD878173A4160F)**
   - Deployed: Jan 13 2026 18:10:32 UTC
   - Constructor Args: None
   - Verification Status: Verified (Exact Match) - Jan 13 2026 18:18:23 UTC
   - Compiler: 0.8.20, EVM: paris, Optimization: Off

3. **NFTMarketplace (0xA1fFc83fEe544E23B069C7E8fE29Ece64938f518)**
   - Deployed: Jan 13 2026 18:10:58 UTC
   - Constructor Args: paymentToken=0xD2B4B5bDb7964B5fB53306C760992c9834f05221 (SimpleToken)
   - Verification Status: Verified (Exact Match) - Jan 13 2026 18:20:59 UTC
   - Compiler: 0.8.20, EVM: paris, Optimization: Off

All contracts used Hardhat v2.28.3 for flattening the source code.
Verification process completed successfully with all required compiler settings matched.
```
