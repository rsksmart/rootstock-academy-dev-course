# Module 4: Testing Smart Contracts with Hardhat and Ethers

## Overview

This module teaches students how to write comprehensive tests for Solidity smart contracts using Hardhat and Ethers.js. Students will learn testing best practices and advanced techniques for blockchain testing.

## Learning Objectives

By completing this module, students will be able to:

1. Write basic deployment and state tests
2. Test contract functions and their effects
3. Verify event emissions
4. Test error handling and reverts
5. Use advanced testing techniques (time manipulation, snapshots, balance manipulation)

## Structure

### Contracts to Test

Located in `contracts/`:

- **Cars.sol**: A contract managing a collection of cars with ownership and events
- **CarLock.sol**: A time-locked contract for advanced testing techniques

### Test Exercises

Located in `test/`:

1. **01-basic-deployment.ts**: Learn to deploy contracts and test initial state
2. **02-testing-functions.ts**: Test contract functions and state changes
3. **03-testing-events.ts**: Verify event emissions with `.to.emit()` and `.withArgs()`
4. **04-testing-reverts.ts**: Test error handling with `.to.be.revertedWith()`
5. **05-advanced-testing.ts**: Advanced techniques (time manipulation, snapshots, balance manipulation)

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Hardhat Network Helpers](https://hardhat.org/hardhat-network-helpers/docs/overview)

## Submissions

Please follow the instructions given in the course, create a PR with the changes to the contracts and the tests pass. this in a public repo [Rootstock Developer Course](https://github.com/rsksmart/rootstock-academy-dev-course). The PR will be automatically reviewed by the Rootstock Developer Experience team.