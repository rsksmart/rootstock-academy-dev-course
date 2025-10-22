# Module 2: Testing Smart Contracts with Hardhat and Ethers

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

Located in `TestTemplates/`:

1. **01-basic-deployment.ts**: Learn to deploy contracts and test initial state
2. **02-testing-functions.ts**: Test contract functions and state changes
3. **03-testing-events.ts**: Verify event emissions with `.to.emit()` and `.withArgs()`
4. **04-testing-reverts.ts**: Test error handling with `.to.be.revertedWith()`
5. **05-advanced-testing.ts**: Advanced techniques (time manipulation, snapshots, balance manipulation)

### Reference Solutions

Located in `test/`: Complete, working versions of each exercise for validation.

### Validators

Located in `test-validators/`: Automated tests that verify student submissions meet requirements.

## Methodology

Each exercise follows a "fill-in-the-blanks" approach:

1. Students receive test files with `___` placeholders
2. Students must replace placeholders with correct code
3. Validators check both code structure and test execution

### Example

```typescript
it("should deploy the Cars contract successfully", async function () {
  const Cars = await ethers.___("Cars");
  const cars = await Cars.___();
  await cars.___();
  
  const address = await cars.___();
  ___(address).to.be.a("___");
});
```

Students fill in:
- `getContractFactory`
- `deploy`
- `waitForDeployment`
- `getAddress`
- `expect`
- `"string"`

## Running the Exercises

### Compile Contracts

```bash
npm run compile
```

### Run Student Tests

```bash
npx hardhat test TestTemplates/01-basic-deployment.ts
```

### Run All Validators

```bash
npm run test:validators
```

### Run Specific Validator

```bash
npx hardhat test test-validators/validate-01-basic-deployment.ts
```

## Validation

Each exercise is validated by checking:

1. **Code Structure**: Uses correct methods and patterns (e.g., `getContractFactory`, `expect`)
2. **Test Execution**: All tests pass when run
3. **Completeness**: Has required number of test cases
4. **Best Practices**: Uses `beforeEach`, proper assertions, etc.

## Ethers.js Methods Reference

### Contract Interaction

- `ethers.getContractFactory(name)`: Get contract factory
- `factory.deploy(...args)`: Deploy contract
- `contract.waitForDeployment()`: Wait for deployment
- `contract.getAddress()`: Get deployed address
- `contract.functionName(...args)`: Call view/pure function
- `contract.functionName(...args)`: Call state-changing function (returns tx)
- `tx.wait()`: Wait for transaction confirmation

### Testing Helpers

- `ethers.getSigners()`: Get test accounts
- `contract.connect(signer)`: Use different account
- `ethers.parseEther(value)`: Convert ETH string to wei
- `ethers.Wallet.createRandom()`: Create random wallet

### Chai Matchers

- `.to.equal(value)`: Exact equality
- `.to.be.a(type)`: Type checking
- `.to.match(regex)`: Pattern matching
- `.to.emit(contract, event)`: Event emission
- `.withArgs(...args)`: Event arguments
- `.to.be.revertedWith(message)`: Revert checking
- `.to.not.be.reverted`: Success checking
- `.to.be.closeTo(value, delta)`: Approximate equality

## Common Patterns

### beforeEach Setup

```typescript
let cars: any;

beforeEach(async () => {
  const Cars = await ethers.getContractFactory("Cars");
  cars = await Cars.deploy();
  await cars.waitForDeployment();
});
```

### Multiple Signers

```typescript
const [owner, user1, user2] = await ethers.getSigners();
await cars.connect(user1).addCar("0xff0000", 4);
```

### Transaction Handling

```typescript
const tx = await cars.addCar("0xff0000", 4);
await tx.wait();
const car = await cars.cars(1);
```

## Assessment Criteria

Students are evaluated on:

1. **Correctness**: Tests pass and verify contract behavior
2. **Completeness**: All required test cases implemented
3. **Code Quality**: Clean, readable test code
4. **Understanding**: Proper use of testing patterns and assertions

## Tips for Students

1. Read error messages carefully - they often indicate what's missing
2. Run tests frequently to get immediate feedback
3. Use `console.log()` in tests to debug (remember to remove before submission)
4. Understand what you're testing - don't just fill blanks randomly
5. Refer to Ethers.js documentation when stuck
6. Compare with simpler examples before tackling advanced exercises

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Hardhat Network Helpers](https://hardhat.org/hardhat-network-helpers/docs/overview)

## Support

If you encounter issues:

1. Check that all dependencies are installed: `npm install`
2. Compile contracts: `npm run compile`
3. Verify Node.js version: `node --version` (should be 18+)
4. Check test output for specific error messages
5. Review the reference solutions in `test/` for comparison

---

**Next Steps**: After completing this module, students will have a solid foundation in smart contract testing and be ready to apply these skills to real-world projects.
