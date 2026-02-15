# Module 5 - Smart Contract Security

## Overview

This module teaches students to identify and fix security vulnerabilities in smart contracts based on a professional audit report.

**Estimated duration**: 4-6 hours  
**Level**: Intermediate-Advanced  
**Prerequisites**: Module 4 completed (Testing)

## Learning Objectives

By the end of this module, students will be able to:

1. Read and interpret a security audit report
2. Identify reentrancy vulnerabilities
3. Identify data validation issues
4. Identify access control problems
5. Apply the Checks-Effects-Interactions pattern
6. Implement robust input validation
7. Implement function access control
8. Verify fixes through automated tests

## Structure

```
module5/
├── one-mil-nft-pixels--security-assessment-report--v1.1.pdf  # Audit report
├── contracts/
│   ├── OneMilNftPixels.sol                                   # VULNERABLE contract
│   ├── LunaToken.sol                                          # ERC20 token for payments
│   ├── MeowToken.sol                                          # Additional token
│   ├── PurrToken.sol                                          # Additional token
│   └── security-audit/
│       ├── Exploit-OMP001.sol                                 # Reentrancy exploit
│       ├── Exploit-OMP003.sol                                 # Frontrunning exploit
│       └── FIXED_CONTRACT/
│           └── OneMilNftPixels[FIXED].sol                     # Fixed version example
└── test/
    ├── Exploit-OMP001.js                                      # Reentrancy tests
    ├── Exploit-OMP002.js                                      # Validation tests
    ├── Exploit-OMP003.js                                      # Access control tests
    ├── OneMilNftPixels-deploy.js                              # Deployment tests
    ├── OneMilNftPixels-buy-success.js                         # Buy functionality tests
    ├── OneMilNftPixels-buy-fail.js
    ├── OneMilNftPixels-rebuy-success.js                       # Rebuy functionality tests
    ├── OneMilNftPixels-rebuy-fail.js
    ├── OneMilNftPixels-compensation.js                        # Compensation tests
    ├── OneMilNftPixels-admin-owner-success.js                 # Admin functions tests
    ├── OneMilNftPixels-admin-non-owner-fail.js
    ├── OneMilNftPixels-update-owner-success.js                # Update functionality tests
    ├── OneMilNftPixels-update-owner-fail.js
    └── OneMilNftPixels-update-non-owner-fail.js
```

## What to do?

1. Read the audit report (`one-mil-nft-pixels--security-assessment-report--v1.1.pdf`)
2. Identify the vulnerabilities in the vulnerable contract (`contracts/OneMilNftPixels.sol`)
3. Fix the vulnerabilities in the vulnerable contract (`contracts/OneMilNftPixels.sol`)
4. Run the tests to verify the fixes (`Exploit-OMP001.js`, `Exploit-OMP002.js`, `Exploit-OMP003.js`)
5. Submit the fixes (`OneMilNftPixels.sol`)

**Key learning**: Use whitelists and avoid delegatecall with unvalidated external data.

## Additional Resources

- [ConsenSys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [OpenZeppelin Security Patterns](https://docs.openzeppelin.com/contracts/4.x/)
- [SWC Registry](https://swcregistry.io/)

## Submissions

Please follow the instructions given in the course, create a PR with the changes to the contracts and the tests pass. this in a public repo [Rootstock Developer Course](https://github.com/rsksmart/rootstock-academy-dev-course). The PR will be automatically reviewed by the Rootstock Developer Experience team.