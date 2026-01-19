<h1>Rootstock Developer Course</h1>

# Table of Contents

> All the sections in this repo are for the Rootstock Developer Course.

<details>
<summary> <a href="#welcome-to-the-course-repo">Welcome to the Course Repo!</a></summary>
<ol>
  <li><a href="#welcome-to-the-course">Welcome to the course!</a></li>
  <li><a href="#best-practices">Best Practices</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#how-to-submit-your-work">How to Submit Your Work</a></li>
</ol>
</details>
<details>
<summary> <a href="#module-3-write-smart-contracts">Module 3: Write Smart Contracts</a></summary>
<ol>
  <li><a href="#module-3-overview">Overview</a></li>
  <li><a href="#module-3-exercises">Exercises</a></li>
  <li><a href="#module-3-running-tests">Running Tests</a></li>
  <li><a href="#module-3-submission-guidelines">Submission Guidelines</a></li>
</ol>
</details>
<details>
<summary> <a href="#module-4-test-smart-contracts">Module 4: Test Smart Contracts</a></summary>
<ol>
  <li><a href="#module-4-overview">Overview</a></li>
  <li><a href="#module-4-exercises">Exercises</a></li>
  <li><a href="#module-4-running-tests">Running Tests</a></li>
  <li><a href="#module-4-submission-guidelines">Submission Guidelines</a></li>
</ol>
</details>
<details>
<summary> <a href="#module-5-secure-smart-contracts">Module 5: Secure Smart Contracts</a></summary>
<ol>
  <li><a href="#module-5-overview">Overview</a></li>
  <li><a href="#module-5-vulnerabilities">Vulnerabilities</a></li>
  <li><a href="#module-5-running-tests">Running Tests</a></li>
  <li><a href="#module-5-submission-guidelines">Submission Guidelines</a></li>
</ol>
</details>
<details>
<summary> <a href="#module-6-deploy-smart-contracts">Module 6: Deploy Smart Contracts</a></summary>
<ol>
  <li><a href="#module-6-overview">Overview</a></li>
  <li><a href="#module-6-exercises">Exercises</a></li>
  <li><a href="#module-6-running-scripts">Running Scripts</a></li>
  <li><a href="#module-6-submission-guidelines">Submission Guidelines</a></li>
</ol>
</details>
<details>
<summary> <a href="#module-7-verify-smart-contracts">Module 7: Verify Smart Contracts</a></summary>
<ol>
  <li><a href="#module-7-overview">Overview</a></li>
  <li><a href="#module-7-exercise">Exercise</a></li>
  <li><a href="#module-7-verification-process">Verification Process</a></li>
  <li><a href="#module-7-submission-guidelines">Submission Guidelines</a></li>
</ol>
</details>

---

# Welcome to the Course Repo

## Welcome to the course!

Welcome to the **Rootstock Developer Course**! This hands-on course will guide you through blockchain development fundamentals, from basic Solidity concepts to advanced smart contract patterns.

### What You'll Learn

- ✅ Solidity programming language fundamentals
- ✅ Smart contract testing with Hardhat and Foundry
- ✅ Smart contract deployment
- ✅ Best practices for secure contract design
- ✅ Real-world project development

## Best Practices

### Working with the Repository

- **Fork this repository** to your GitHub account before starting
- **Create a new branch** for each module following the format: `module[number]/[username-or-email]`
  - Example: `module1/andrew` or `module1/student@email.com`
- **Commit frequently** with descriptive messages
- **Test your code** before submitting
- **Read the instructions carefully** in each exercise
- **Use the required Pull Request Name Format** to verify your solutions
  - Example: `module1/andrew` or `module1/student@email.com`
- **Create a Pull Request** to the main Rootstock Developer Course repository
- **Wait for review** from the RSK Developer Education team
- **Once approved, your grade will be recorded in the platform**

### Code Quality

- Follow Solidity style guidelines
- Test your contracts thoroughly
- Use meaningful variable and function names

### Getting Help

- Review the lesson videos before starting exercises
- Check the exercise descriptions in each module's README
- Test your code frequently using the provided test suites
- Ask questions in the course community forum (Discord) or using GitHub Issues
- Review the reference documentation when needed

## Getting Started

### Prerequisites

Before starting the course, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Install Git](https://git-scm.com/downloads)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/download))
- Basic JavaScript/TypeScript knowledge

### Installation

1. **Fork this repository** to your GitHub account

2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/rsksmart/rootstock-academy-dev-course.git
   cd rootstock-academy-dev-course
   ```

3. **Navigate to Desired Module Folder** and install dependencies:
   ```bash
   cd module2 #(module2 for example)
   npm install
   ```

4. **Verify your setup** by running the tests:
   ```bash
   npx hardhat test
   ```

You should see tests running (they will fail initially - that's expected!). Take in account each module has different exercises and tests, and ways to run the tests.

## How to Submit Your Work

### Submission Process

1. **Complete the exercises** by filling in the blanks in the contract templates
2. **Run the tests (locally)** to verify your solutions
3. **Commit your changes** to your fork
4. **Create a Pull Request** to the main [Rootstock Developer Course repository](https://github.com/rsksmart/rootstock-academy-dev-course)
5. **Wait for review** from the RSK Developer Education team

### Creating a Pull Request

**Important**: Your Pull Request must follow this naming convention:

```
module[number]/[username-or-email]
```

**Examples**:
- `module2/your-username` (using course username)
- `module2/student@email.com` (using email)
- `module3/your-username` (for Module 3)

**Steps to create your PR**:

```bash
# Create a branch with the correct naming format
git checkout -b module2/your-username

# Commit your changes
git add .
git commit -m "Complete Module 2 exercises"

# Push your branch to your fork
git push origin module2/your-username

# Create a PR on GitHub from your fork to the parent repository
# Make sure the PR title follows the same format: module2/your-username
```

### What Happens Next?

1. Your PR will be automatically tested
2. The DevX team will review your submission
3. You'll receive feedback if changes are needed
4. Once approved, your grade will be recorded in the platform
5. You can proceed to the next module!

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Module 3: Write Smart Contracts

💡 **Learning Time**: 4-6 hours  
📹 **Video Lessons**: Available on the platform  
🎯 **Goal**: Master core Solidity concepts through hands-on coding

## Module 3 Overview

In Module 3, you'll learn the fundamental building blocks of Solidity smart contracts through 13 progressive exercises. Each exercise builds on the previous one, taking you from basic contract structure to advanced concepts like interfaces and imports.

### What You'll Build

You'll build a **Cars Smart Contract** that demonstrates:
- Contract structure and state management
- Data types (primitives, enums, structs)
- Functions with parameters and return values
- Access control with modifiers
- Events for logging
- Contract interaction through interfaces

## Module 3 Exercises

| # | Exercise | Concepts | Difficulty |
|---|----------|----------|------------|
| 01 | [Contract Structure](./module2/ContractsTemplate/01-contract.sol) | `pragma`, `contract`, `constructor` | ⭐ |
| 02 | [Primitive Variables](./module2/ContractsTemplate/02-primitive-variables.sol) | `bool`, `uint256`, `address`, `public` | �0 |
| 03 | [Enumerations](./module2/ContractsTemplate/03-enum.sol) | `enum`, custom types | ⭐ |
| 04 | [Structures](./module2/ContractsTemplate/04-struct.sol) | `struct`, composite types | ⭐⭐ |
| 05 | [Dynamic Variables](./module2/ContractsTemplate/05-dynamic-variables.sol) | `mapping`, key-value storage | ⭐⭐ |
| 06 | [Function Signatures](./module2/ContractsTemplate/06-function-stub.sol) | function declarations, parameters | ⭐⭐ |
| 07 | [Function Implementation](./module2/ContractsTemplate/07-function-impl.sol) | `memory`, `msg.sender`, logic | ⭐⭐ |
| 08 | [Require Statements](./module2/ContractsTemplate/08-require.sol) | `payable`, `require`, validation | ⭐⭐⭐ |
| 09 | [Function Modifiers](./module2/ContractsTemplate/09-function-modifier.sol) | `modifier`, `_`, reusable checks | ⭐⭐⭐ |
| 10 | [Events & Logs](./module2/ContractsTemplate/10-event-logs.sol) | `event`, `emit`, `indexed` | ⭐⭐⭐ |
| 11 | [Interfaces](./module2/ContractsTemplate/11-interface.sol) | `interface`, `external`, `is` | ⭐⭐⭐⭐ |
| 12 | [Interface References](./module2/ContractsTemplate/12-reference-interface.sol) | contract references, casting | ⭐⭐⭐⭐ |
| 13 | [Imports](./module2/ContractsTemplate/13-import.sol) | `import`, modular code | ⭐⭐⭐⭐ |

## Module 3 Running Tests

### Run All Tests
```bash
cd module3
npx hardhat test
```

### Run a Specific Test
```bash
npx hardhat test test/01-contract.ts
```

### View Detailed Test Output
```bash
npx hardhat test --verbose
```

## How to Complete Module 3 Exercises

### Step 1: Open the Template

Navigate to `module3/ContractsTemplate/` and open the exercise file. You'll see code with blanks (`___`):

```solidity
// Example from 01-contract.sol
___ solidity ^0.8.0;

___ Abc {
    ___() {
    }
}
```

### Step 2: Fill in the Blanks

Replace each `___` with the correct Solidity code:

```solidity
pragma solidity ^0.8.0;

contract Abc {
    constructor() {
    }
}
```

### Step 3: Test Your Solution

Run the corresponding test file:

```bash
npx hardhat test test/01-contract.ts
```

### Step 4: Fix Any Errors

If tests fail, read the error messages carefully:
- ❌ **Syntax errors**: Check your Solidity syntax
- ❌ **Test failures**: Verify you used the correct keywords and types
- ❌ **Compilation errors**: Ensure your code compiles

### Step 5: Move to the Next Exercise

Once all tests pass (✅), move to the next exercise!

## Module 3 Submission Guidelines

### Before Submitting

- ✅ All tests must pass
- ✅ Code must compile without warnings
- ✅ No syntax errors
- ✅ Follow the exercise instructions exactly

### Submission Checklist

```bash
# 1. Create a branch following the naming convention: module1/your-username
git checkout -b module3/your-username

# 2. Run all tests one final time
cd module3
npx hardhat test

# 3. Check for any uncommitted changes
git status

# 4. Commit your work
git add module3/
git commit -m "Complete Module 1: Solidity Fundamentals"

# 5. Push to your fork
git push origin module3/your-username

# 6. Create Pull Request on GitHub to the parent repository
# PR title must be: module1/your-username
```

**Remember**: Replace `your-username` with your course username or email address.

### What We Check

Your submission will be evaluated on:
1. **Correctness**: All tests pass ✅
2. **Completeness**: All exercises completed
3. **Code Quality**: Clean, readable code
4. **Following Instructions**: Used correct keywords and patterns

## Module 3 Troubleshooting

### Tests Won't Run

```bash
# Try reinstalling dependencies
rm -rf node_modules package-lock.json
npm install
```

### Compilation Errors

- Check your Solidity version (`pragma solidity ^0.8.0;`)
- Ensure all syntax is correct
- Look for missing semicolons or brackets

### Test Failures

- Read the test output carefully
- Check you're using the exact keywords required
- Verify variable types match expectations
- Ensure function signatures are correct

### Need More Help?

- Check the [Hardhat Documentation](https://hardhat.org/docs)
- Review [Solidity by Example](https://solidity-by-example.org/)
- Ask in the course discussion forum
- Reach out to the DevX team

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Module 4: Test Smart Contracts

💡 **Learning Time**: 6-8 hours  
📹 **Video Lessons**: Available on the platform  
🎯 **Goal**: Master smart contract testing with Hardhat and Ethers.js

## Module 4 Overview

In Module 4, you'll learn how to write comprehensive tests for Solidity smart contracts using Hardhat and Ethers.js. This module teaches you testing best practices and advanced techniques essential for building reliable blockchain applications.

### What You'll Learn

By completing this module, you will be able to:
- Write basic deployment and state tests
- Test contract functions and their effects
- Verify event emissions
- Test error handling and reverts
- Use advanced testing techniques (time manipulation, snapshots, balance manipulation)

### Contracts You'll Test

- **Cars.sol**: A contract managing a collection of cars with ownership and events
- **CarLock.sol**: A time-locked contract for advanced testing techniques

## Module 4 Exercises

| # | Exercise | Topics Covered | Difficulty |
|---|----------|----------------|------------|
| 01 | [Basic Deployment](./module4/TestTemplates/01-basic-deployment.ts) | `getContractFactory`, `deploy`, `waitForDeployment` | ⭐ |
| 02 | [Testing Functions](./module4/TestTemplates/02-testing-functions.ts) | Function calls, state changes, `connect()` | ⭐⭐ |
| 03 | [Testing Events](./module4/TestTemplates/03-testing-events.ts) | `.to.emit()`, `.withArgs()`, event verification | ⭐⭐⭐ |
| 04 | [Testing Reverts](./module4/TestTemplates/04-testing-reverts.ts) | `.to.be.revertedWith()`, error handling | ⭐⭐⭐ |
| 05 | [Advanced Testing](./module4/TestTemplates/05-advanced-testing.ts) | Time manipulation, snapshots, balance checks | ⭐⭐⭐⭐ |

## Module 4 Running Tests

### Compile Contracts
```bash
cd module4
npm run compile
```

### Run Your Tests
```bash
# Run a specific test template you're working on
npx hardhat test test/01-basic-deployment.ts

# Run all your test templates
npx hardhat test
```

### View Detailed Test Output
```bash
npx hardhat test --verbose
```

## How to Complete Module 4 Exercises

### Step 1: Open the Test File

Navigate to `module4/test/` and open the test file. You'll see test code with blanks (`___`):

```typescript
// Example from 01-basic-deployment.ts
it("should deploy the Cars contract successfully", async function () {
  const Cars = await ethers.___("Cars");
  const cars = await Cars.___();
  await cars.___();
  
  const address = await cars.___();
  ___(address).to.be.a("___");
});
```

### Step 2: Fill in the Blanks

Replace each `___` with the correct Ethers.js code:

```typescript
it("should deploy the Cars contract successfully", async function () {
  const Cars = await ethers.getContractFactory("Cars");
  const cars = await Cars.deploy();
  await cars.waitForDeployment();
  
  const address = await cars.getAddress();
  expect(address).to.be.a("string");
});
```

### Step 3: Test Your Solution

Run the test file to verify your solution:

```bash
npx hardhat test test/01-basic-deployment.ts
```

### Step 4: Fix Any Errors

If tests fail, read the error messages carefully:
- ❌ **Method errors**: Check Ethers.js method names and syntax
- ❌ **Assertion errors**: Verify your expect statements
- ❌ **Compilation errors**: Ensure contracts compile first

### Step 5: Move to the Next Exercise

Once all tests pass (✅), move to the next exercise!

## Module 4 Submission Guidelines

### Before Submitting

- ✅ All tests completed
- ✅ All tests pass when run
- ✅ No syntax errors
- ✅ Code follows testing best practices

### Submission Checklist

```bash
# 1. Create a branch following the naming convention: module4/your-username
git checkout -b module4/your-username

# 2. Run all tests one final time
cd module4
npm run test

# 3. Check for any uncommitted changes
git status

# 4. Commit your work
git add module4/
git commit -m "Complete Module 4: Testing Smart Contracts"

# 5. Push to your fork
git push origin module4/your-username

# 6. Create Pull Request on GitHub to the parent repository
# PR title must be: module4/your-username
```

**Remember**: Replace `your-username` with your course username or email address.

### What We Check

Your submission will be evaluated on:
1. **Correctness**: All tests pass ✅
2. **Completeness**: All exercises completed
3. **Test Quality**: Proper use of assertions and patterns
4. **Best Practices**: Uses `beforeEach`, proper test structure, etc.

## Module 4 Troubleshooting

### Tests Won't Run

```bash
# Try reinstalling dependencies
rm -rf node_modules package-lock.json
npm install
```

### Compilation Errors

```bash
# Compile contracts first
npm run compile

# Or clean and recompile
npx hardhat clean
npm run compile
```

### Test Failures

- Verify you're using the correct Ethers.js v6 syntax
- Check that all async operations are awaited
- Ensure contract methods are called correctly

### Need More Help?

- Check the [Hardhat Documentation](https://hardhat.org/docs)
- Review [Ethers.js v6 Documentation](https://docs.ethers.org/)
- Review the module-specific README: `module4/README.md`
- Ask in the course discussion forum
- Reach out to the DevX team

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Module 5: Secure Smart Contracts

💡 **Learning Time**: 4-6 hours  
📹 **Video Lessons**: Available on the platform  
🎯 **Goal**: Identify and fix security vulnerabilities in smart contracts based on professional audit reports

## Module 5 Overview

In Module 5, you'll learn how to identify and fix critical security vulnerabilities in Solidity smart contracts. This module is based on a real security audit report and teaches you essential security patterns used in professional blockchain development.

### What You'll Learn

By completing this module, you will be able to:
- Read and interpret professional security audit reports
- Identify and fix reentrancy vulnerabilities
- Identify and fix data validation issues
- Identify and fix access control problems
- Apply the Checks-Effects-Interactions pattern
- Implement robust input validation
- Implement proper function access control
- Verify security fixes through automated tests

### What You'll Fix

You'll work with the **OneMilNftPixels** contract, a vulnerable NFT marketplace that contains three critical security vulnerabilities discovered in a professional audit. Your goal is to fix these vulnerabilities while maintaining the contract's functionality.

## Module 5 Vulnerabilities

| # | Vulnerability | Severity | Type | Difficulty |
|---|---------------|----------|------|------------|
| OMP-001 | [Reentrancy in withdrawCompensation](./module5/README.md#omp-001-reentrancy-in-withdrawcompensation) | 🔴 CRITICAL | Reentrancy Attack | ⭐⭐⭐⭐ |
| OMP-002 | [NFTs can be purchased for free](./module5/README.md#omp-002-nfts-can-be-purchased-for-free) | 🔴 CRITICAL | Data Validation | ⭐⭐⭐ |
| OMP-003 | [Frontrunners can deny NFT purchases](./module5/README.md#omp-003-frontrunners-can-deny-nft-purchases) | 🟠 HIGH | Access Control | ⭐⭐⭐⭐ |

### Vulnerability Details

#### OMP-001: Reentrancy Attack
**Concept**: Checks-Effects-Interactions Pattern

The contract updates state **after** making an external call, allowing attackers to re-enter the function and drain funds.

**Key Learning**: Always update state before external calls to prevent reentrancy attacks.

#### OMP-002: Data Validation
**Concept**: Input Validation

The contract doesn't validate that encoded data matches actual transferred amounts, allowing attackers to buy NFTs for free.

**Key Learning**: Always validate that calldata matches actual values - never trust user-provided data.

#### OMP-003: Access Control
**Concept**: Function Whitelisting

The contract allows `delegatecall` to any function, enabling frontrunning attacks that can deny legitimate purchases.

**Key Learning**: Use whitelists and avoid delegatecall with unvalidated external data.

## Module 5 Running Tests

### Compile Contracts
```bash
cd module5
npx hardhat compile
```

### Run Security Tests
```bash
# Run all exploit tests to verify your fixes
npx hardhat test test/Exploit-OMP001.js
npx hardhat test test/Exploit-OMP002.js
npx hardhat test test/Exploit-OMP003.js

# Run all tests including functionality tests
npx hardhat test
```

### View Detailed Test Output
```bash
npx hardhat test --verbose
```

## How to Complete Module 5

### Step 1: Read the Audit Report

Open and carefully read the security audit report:
```
module5/one-mil-nft-pixels--security-assessment-report--v1.1.pdf
```

This professional audit report details:
- The three critical vulnerabilities
- How each vulnerability can be exploited
- The impact and severity of each issue
- Recommendations for fixing each vulnerability

### Step 2: Study the Vulnerable Contract

Open the vulnerable contract:
```
module5/contracts/OneMilNftPixels.sol
```

Study the code and try to identify:
- Where the reentrancy vulnerability exists
- Where validation is missing
- Where access control is insufficient

### Step 3: Analyze the Exploits

Review the exploit contracts to understand how attackers would exploit these vulnerabilities:
```
module5/contracts/security-audit/Exploit-OMP001.sol  # Reentrancy exploit
module5/contracts/security-audit/Exploit-OMP003.sol  # Frontrunning exploit
```

### Step 4: Fix the Vulnerabilities

Modify `OneMilNftPixels.sol` to fix all three vulnerabilities:

**OMP-001 Fix**: Update state before external calls
```solidity
// Move state update BEFORE the external call
compensationBalances[_msgSender()] = 0;
bool withdrawalSuccess = acceptedToken.transferAndCall(address(to), compensationBalance);
```

**OMP-002 Fix**: Add validation
```solidity
// Validate that encoded amount matches actual amount
require(amount == _amount, 'Amount mismatch');
```

**OMP-003 Fix**: Implement function whitelist
```solidity
// Only allow specific functions
require(
    selector == this.buy.selector || selector == this.update.selector,
    'Call of an unknown function'
);
```

### Step 5: Run Tests to Verify Fixes

Run the exploit tests to verify your fixes prevent the attacks:

```bash
# These tests should now PASS (exploits should FAIL)
npx hardhat test test/Exploit-OMP001.js  # 5 tests should pass
npx hardhat test test/Exploit-OMP002.js  # 3 tests should pass
npx hardhat test test/Exploit-OMP003.js  # 5 tests should pass
```

### Step 6: Verify Functionality Still Works

Ensure your fixes didn't break the contract's normal functionality:

```bash
# All functionality tests should still pass
npx hardhat test
```

## Module 5 Submission Guidelines

### Before Submitting

- ✅ All three vulnerabilities fixed
- ✅ All exploit tests pass (exploits should fail)
- ✅ All functionality tests still pass
- ✅ Code includes comments explaining the fixes
- ✅ You can explain each vulnerability and its fix

### Submission Checklist

```bash
# 1. Create a branch following the naming convention: module5/your-username
git checkout -b module4/your-username

# 2. Run all tests one final time
cd module5
npx hardhat test

# 3. Check for any uncommitted changes
git status

# 4. Commit your work
git add module5/
git commit -m "Complete Module 5: Smart Contract Security"

# 5. Push to your fork
git push origin module5/your-username

# 6. Create Pull Request on GitHub to the parent repository
# PR title must be: module5/your-username
```

**Remember**: Replace `your-username` with your course username or email address.

### What We Check

Your submission will be evaluated on:
1. **Security**: All vulnerabilities properly fixed ✅
2. **Correctness**: All tests pass (13 exploit tests + functionality tests) ✅
3. **Code Quality**: Clean code with clear comments explaining fixes
4. **Understanding**: Able to explain each vulnerability and why your fix works
5. **No Breaking Changes**: Original functionality still works correctly

### Expected Test Results

After your fixes, you should see:

**Exploit-OMP001.js** (5 tests passing):
- ✅ Transfer some lunas to exploit
- ✅ Transfer some lunas to oneMlnPix
- ✅ Should NOT exploit reentrancy in withdrawCompensation()
- ✅ Should NOT withdraw (almost) all Lunas from oneMlnPix
- ✅ Exploit balance should NOT increase

**Exploit-OMP002.js** (3 tests passing):
- ✅ Attacker should have 1 Luna token
- ✅ Attacker is NOT able to buy pixel for low price
- ✅ Pixel should remain unowned after exploit attempt

**Exploit-OMP003.js** (5 tests passing):
- ✅ Deployer buys pixel 1001
- ✅ Buyer becomes the new owner
- ✅ Deployer buys the pixel back
- ✅ Buyer receives a compensation
- ✅ Attacker should NOT call withdrawCompensation through transferAndCall

## Module 5 Tips for Success

### 📚 Learning Resources

- **Read the audit report thoroughly** - it contains all the information you need
- **Study the exploit contracts** - understanding the attack helps you fix it
- **Review the module README** in `module5/README.md` for detailed explanations
- **Watch the video lessons** before attempting the fixes
- **Research the security patterns**: Checks-Effects-Interactions, input validation, access control

### 💡 Common Mistakes to Avoid

- Don't just move code around without understanding why
- Don't add validation in the wrong place (OMP-002 needs validation in `_transferReceived`)
- Don't forget that fixing one vulnerability shouldn't break functionality
- Don't skip reading the audit report - it has crucial details
- Don't use complex solutions when simple ones work better

## Module 5 Troubleshooting

### Tests Don't Compile

```bash
# Try reinstalling dependencies
rm -rf node_modules package-lock.json
npm install

# Recompile contracts
npx hardhat clean
npx hardhat compile
```

### "Amount mismatch" Error in Normal Tests

**Cause**: Validation added in wrong place  
**Solution**: Only validate in `_transferReceived`, not in `buy` or `update` functions directly

### Exploit Tests Still Fail

**Cause**: Vulnerability not properly fixed  
**Solution**: 
- Re-read the audit report section for that vulnerability
- Check the expected solution in `module5/README.md`
- Verify you implemented the fix in the correct location
- Make sure state updates happen before external calls (OMP-001)

### Functionality Tests Break After Fixes

**Cause**: Fixes too restrictive or in wrong place  
**Solution**:
- Ensure fixes only affect the vulnerable code paths
- Don't add unnecessary restrictions
- Test both exploit prevention AND normal usage

### Need More Help?

- Check the detailed explanations in `module5/README.md`
- Review the [ConsenSys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- Study the [OpenZeppelin Security Patterns](https://docs.openzeppelin.com/contracts/4.x/)
- Review the [SWC Registry](https://swcregistry.io/) for vulnerability classifications
- Ask in the course discussion forum
- Reach out to the DevX team

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Module 6: Deploy Smart Contracts

💡 **Learning Time**: 3-4 hours  
📹 **Video Lessons**: Available on the platform  
🎯 **Goal**: Master smart contract deployment with Hardhat and network configuration

## Module 6 Overview

In Module 6, you'll learn how to deploy smart contracts using Hardhat, configure multiple networks, and manage deployment scripts. This module teaches you deployment best practices essential for taking your smart contracts from development to production.

### What You'll Learn

By completing this module, you will be able to:
- Write deployment scripts using Hardhat
- Configure multiple networks (local, testnet, mainnet)
- Manage environment variables securely
- Deploy contracts with constructor parameters
- Deploy multiple interdependent contracts
- Save and manage deployment artifacts

### Contracts You'll Deploy

- **SimpleToken.sol**: A basic ERC20 token for deployment practice
- **NFTMarketplace.sol**: A complex contract with dependencies
- **PriceOracle.sol**: A contract for oracle functionality

## Module 6 Exercises

| # | Exercise | Topics Covered | Difficulty |
|---|----------|----------------|------------|
| 01 | [Basic Deployment](./module6/scripts/01-deploy-simple.ts) | `getContractFactory`, `deploy`, `waitForDeployment` | ⭐ |
| 02 | [Deploy with Parameters](./module6/scripts/02-deploy-with-params.ts) | Constructor args, state verification | ⭐⭐ |
| 03 | [Deploy Multiple Contracts](./module6/scripts/03-deploy-multiple.ts) | Dependencies, contract linking | ⭐⭐⭐ |
| 04 | [Network Configuration](./module6/hardhat.config.ts) | RSK networks, accounts, gas settings | ⭐⭐ |

## Module 6 Running Scripts

### Install Dependencies
```bash
cd module6
npm install
```

### Compile Contracts
```bash
npx hardhat compile
```

### Run Deployment Scripts
```bash
# Exercise 1: Basic deployment
npx hardhat run scripts/01-deploy-simple.ts

# Exercise 2: Deploy with parameters
npx hardhat run scripts/02-deploy-with-params.ts

# Exercise 3: Deploy multiple contracts
npx hardhat run scripts/03-deploy-multiple.ts
```

### Deploy to RSK Testnet (Optional)
```bash
# First, get some tRBTC from the RSK Testnet Faucet: https://faucet.rsk.co/

# Create .env file with your private key
cp env.example .env
# Edit .env and add your private key

# Deploy to testnet
npx hardhat run scripts/01-deploy-simple.ts --network rskTestnet
```

## How to Complete Module 6 Exercises

### Step 1: Open the Script File

Navigate to `module6/scripts/` and open the script file. You'll see code with TODOs:

```typescript
// Example from 01-deploy-simple.ts
async function main() {
    // TODO 1: Get the contract factory for SimpleToken
    
    // TODO 2: Deploy the contract with parameters
    
    // TODO 3: Wait for deployment and get address
    
    // TODO 4: Save deployment info to file
}
```

### Step 2: Complete the TODOs

Replace each TODO with the correct implementation:

```typescript
async function main() {
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    const token = await SimpleToken.deploy("SimpleToken", "STK", 1000000);
    await token.waitForDeployment();
    const address = await token.getAddress();
    
    // Save deployment info...
}
```

### Step 3: Run Your Script

Execute the script to verify it works:

```bash
npx hardhat run scripts/01-deploy-simple.ts
```

### Step 4: Check the Output

Verify that:
- ✅ Script runs without errors
- ✅ Contract address is displayed
- ✅ Deployment artifact is created in `deployments/`

### Step 5: Move to the Next Exercise

Once your script works correctly, move to the next exercise!

## Module 6 Submission Guidelines

### Before Submitting

- ✅ All deployment scripts execute without errors
- ✅ Deployment artifacts are created in `deployments/`
- ✅ Network configuration is valid for RSK
- ✅ Code follows best practices

### Expected Output

After completing all exercises, your `deployments/` folder should contain:

```
deployments/
├── SimpleToken.json
├── SimpleToken-custom.json
└── all-contracts.json
```

### Submission Checklist

```bash
# 1. Create a branch following the naming convention: module6/your-username
git checkout -b module6/your-username

# 2. Run all scripts one final time
cd module6
npx hardhat run scripts/01-deploy-simple.ts
npx hardhat run scripts/02-deploy-with-params.ts
npx hardhat run scripts/03-deploy-multiple.ts

# 3. Check for any uncommitted changes
git status

# 4. Commit your work
git add module6/
git commit -m "Complete Module 6: Smart Contract Deployment"

# 5. Push to your fork
git push origin module6/your-username

# 6. Create Pull Request on GitHub to the parent repository
# PR title must be: module6/your-username
```

**Remember**: Replace `your-username` with your course username or email address.

### What We Check

Your submission will be evaluated on:
1. **Correctness**: All scripts execute successfully ✅
2. **Completeness**: All exercises completed
3. **Artifacts**: Deployment JSON files created correctly
4. **Configuration**: Network configuration is valid
5. **Best Practices**: Proper error handling and logging

## Module 6 Troubleshooting

### Scripts Won't Run

```bash
# Try reinstalling dependencies
rm -rf node_modules package-lock.json
npm install
```

### Compilation Errors

```bash
# Compile contracts first
npx hardhat compile

# Or clean and recompile
npx hardhat clean
npx hardhat compile
```

### Network Connection Issues

- Verify your `.env` file has the correct RPC URLs
- Check that the private key is valid (for testnet deployments)
- Ensure you have tRBTC for gas (for testnet deployments)

### Deployment Artifacts Not Created

- Ensure you're using `fs.writeFileSync` correctly
- Check that the `deployments/` directory exists or is created
- Verify the JSON.stringify format is correct

### Need More Help?

- Check the [Hardhat Deployment Guide](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- Review [RSK Developer Portal](https://developers.rsk.co/)
- Review the module-specific README: `module6/README.md`
- Ask in the course discussion forum
- Reach out to the DevX team

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

# Module 7: Verify Smart Contracts

💡 **Learning Time**: 2-3 hours  
📹 **Video Lessons**: Available on the platform  
🎯 **Goal**: Learn to verify smart contracts on the Rootstock Explorer

## Module 7 Overview

In Module 7, you'll learn how to verify smart contracts on the Rootstock network. Contract verification is essential for transparency and allows users to interact directly with your contracts through the explorer interface.

### What You'll Learn

By completing this module, you will be able to:
- Deploy smart contracts to Rootstock Testnet
- Understand the importance of contract verification
- Use Hardhat flatten to prepare source code for verification
- Verify contracts on the Rootstock Explorer
- Handle constructor arguments during verification

### Contracts You'll Verify

- **SimpleToken.sol**: ERC20 token contract
- **PriceOracle.sol**: Oracle contract (no constructor args)
- **NFTMarketplace.sol**: Marketplace contract with dependencies

## Module 7 Exercise

| Step | Task | Description | Difficulty |
|------|------|-------------|------------|
| 1 | Setup Environment | Install dependencies, configure `.env` | ⭐ |
| 2 | Deploy to Testnet | Deploy all 3 contracts to RSK Testnet | ⭐⭐ |
| 3 | Flatten Source Files | Generate flattened `.sol` files | ⭐ |
| 4 | Verify on Explorer | Verify all 3 contracts on Rootstock Explorer | ⭐⭐⭐ |
| 5 | Complete Assessment | Fill in `assessment/commands-and-outputs.md` | ⭐ |

## Module 7 Verification Process

### Step 1: Setup Environment

```bash
cd module7
npm install

# Create your .env file
cp env.example .env
# Add your private key to .env

# Get tRBTC from: https://faucet.rsk.co/
```

### Step 2: Compile and Deploy

```bash
# Compile contracts
npx hardhat compile

# Deploy all contracts to RSK Testnet
npx hardhat run scripts/03-deploy-multiple.ts --network rskTestnet
```

> 📝 **Save the deployed addresses!** You'll need them for verification.

### Step 3: Flatten Source Files

```bash
npx hardhat flatten contracts/SimpleToken.sol > SimpleToken-flat.sol
npx hardhat flatten contracts/PriceOracle.sol > PriceOracle-flat.sol
npx hardhat flatten contracts/NFTMarketplace.sol > NFTMarketplace-flat.sol
```

### Step 4: Verify on Rootstock Explorer

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

### Constructor Arguments

| Contract | Constructor Arguments |
|----------|----------------------|
| SimpleToken | `("MarketToken", "MKT", 1000000)` |
| PriceOracle | None (leave empty) |
| NFTMarketplace | `(<SimpleToken_address>)` |

### Step 5: Complete Assessment

Fill in `assessment/commands-and-outputs.md` with:
- Verified contract URLs from Rootstock Explorer
- Screenshots of verification (optional but recommended)

## Verified Examples (Reference)

These are example verified contracts you can reference:

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| SimpleToken | `0xeb08beae...` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xeb08beae69e2ab91724d5a1249ed84656b4b2d8e?tab=contract) |
| PriceOracle | `0xc590cdbe...` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xc590cdbe869ac02652565d1c8ffd878173a4160f?tab=contract) |
| NFTMarketplace | `0xa1ffc83f...` | [View on Explorer](https://explorer.testnet.rootstock.io/address/0xa1ffc83fee544e23b069c7e8fe29ece64938f518?tab=contract) |

## Module 7 Submission Guidelines

### Before Submitting

- ✅ All three contracts deployed to Rootstock Testnet
- ✅ All three contracts verified on the Rootstock Explorer
- ✅ `assessment/commands-and-outputs.md` completed with valid Explorer URLs
- ✅ Screenshots show successful verification (optional)

### Submission Checklist

```bash
# 1. Create a branch following the naming convention: module7/your-username
git checkout -b module7/your-username

# 2. Verify your assessment file is complete
cat module7/assessment/commands-and-outputs.md

# 3. Check for any uncommitted changes
git status

# 4. Commit your work
git add module7/
git commit -m "Complete Module 7: Smart Contract Verification"

# 5. Push to your fork
git push origin module7/your-username

# 6. Create Pull Request on GitHub to the parent repository
# PR title must be: module7/your-username
```

**Remember**: Replace `your-username` with your course username or email address.

### What We Check

Your submission will be evaluated on:
1. **Deployment**: All contracts deployed to RSK Testnet ✅
2. **Verification**: All contracts verified on Explorer ✅
3. **Documentation**: Assessment file contains valid URLs
4. **Completeness**: All three contracts verified

## Module 7 Troubleshooting

### Deployment Fails

- Ensure you have tRBTC in your wallet
- Verify your private key is correct in `.env`
- Check the RPC URL is accessible

### Verification Fails

- Ensure compiler version matches exactly (`v0.8.20`)
- Use `paris` as EVM version
- Disable optimization
- Make sure constructor arguments are ABI-encoded correctly
- Use the flattened source file, not the original

### Constructor Arguments Encoding

Use an [ABI Encoder Tool](https://abi.hashex.org/) to encode constructor arguments if needed.

### Need More Help?

- Check the [Rootstock Explorer Documentation](https://explorer.testnet.rootstock.io/)
- Review the [Hardhat Flatten Guide](https://hardhat.org/hardhat-runner/docs/advanced/flattening)
- Review the module-specific README: `module7/README.md`
- Ask in the course discussion forum
- Reach out to the DevX team

<p align="right">(<a href="#table-of-contents">back to top</a>) ⬆️</p>

---

## Additional Resources

### Official Documentation

- [Rootstock Developers Portal](https://dev.rootstock.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)

### Community

- [Rootstock Discord](https://rootstock.io/discord)
- [Twitter/X](https://twitter.com/rootstock_io)

### Tools

- [Remix IDE](https://remix.ethereum.org/) - Browser-based Solidity IDE
- [Hardhat](https://hardhat.org/) - Development environment
- [OpenZeppelin](https://www.openzeppelin.com/) - Secure contract library

---

## Contact & Support

For questions or issues:
- **Technical Support**: DevX (DevRel) Team
- **Course Content**: platform messaging
- **Community Help**: Discord #developer-support channel

---

## License

This course material is provided by Rootstock for educational purposes.

© 2025 Rootstock. All rights reserved.

---
