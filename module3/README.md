# Module 3 - Write Smart Contracts

## Overview

In this module, you will learn the fundamental building blocks of Solidity smart contracts through 13 progressive exercises. Each exercise builds on the previous one, taking you from basic contract structure to advanced concepts like interfaces and imports.

## Code Example - Initial

In this folder you will find code for a project that is incomplete, missing features, containing bugs, or a combination of the above.

## Task

Your task is to check what is missing or contains errors, and complete/fix it.

- `01-contract.sol` <!-- showDiff -->
  - Implement a valid Solidity smart contract that can compile
  - Fill in the missing keywords
- `02-primitive-variables.sol` <!-- showDiff -->
  - Add primitive variables to a smart contract
  - `isBlack` should be able to store a boolean value, true or false
  - `doors` should be able to store a big (big-int) non-negative whole number
  - `owner` should be able to reference an EOA (Externally Owned Account) or a SC (Smart Contract)
  - All the variables should be `public`
- `03-enum.sol` <!-- showDiff -->
  - Add an enumerated value for `CarStatus`, which can be either `driving` or `parked`
  - Add a state variable for `status` that uses this enumeration
- `04-struct.sol` <!-- showDiff -->
  - Create a structure for `Car`
  - Shift all existing state variables (`colour`, `doors`, `owner`, `status`) into it
  - What happens to the visibility modifiers?
- `05-dynamic-variables.sol` <!-- showDiff -->
  - Create a dynamic variable `cars` that stores key value pairs
    - where the key is a large non-negative whole number, and
    - the value is an instance of the `Car` structure already defined
  - Create a primitive variable `numCars` that
    stores a large non-negative whole number
- `06-function-stub.sol` <!-- showDiff -->
  - Write a new function `addCar`
  - It should take 2 parameters `colour` and `doors`
  - It should be invokable by EOAs or SCs
  - It should return `carId` with the type of large non-negative whole number
  - The implementation of this function may be left empty (in this step)
- `07-function-impl.sol` <!-- showDiff -->
  - Add implementation to the `addCar` function
  - Increment the `numCars` primitive variable, and assign it to the return variable
  - Create a new `memory` instance of the structure for `Car`, named `newCar`
    - Its `status` should be the enumeration for parked
    - Its `owner` should be the EOA or SC invoking this function
  - Store `newCar` in the `cars` dynamic variable
- `08-require.sol` <!-- showDiff -->
  - Add a new modifier to the `addCar` function which allows
    this SC to receive cryptocurrency when invoked
  - Add a `require` statement to the `addCar` function which specifies
    a minimum amount of `0.1 ether` be sent
  - Implement a new function `statusChange`,
    which takes `carId` and `newStatus` and parameters
  - Use a `require` statement within the `statusChange` function
    to check that the the `owner` of the car matches the EOA or SC invoking this function
  - Use a `require` statement within the `statusChange` function
    to check that the new status differs from the current one
- `09-function-modifier.sol` <!-- showDiff -->
  - Extract the require statement which checks for `owner`
    into its own function modifier, named `onlyOwner`
  - This modifier should take `carId` as a parameter
- `10-event-logs.sol` <!-- showDiff -->
  - Define an event named `LoudSound`
    with `carId` as an indexed parameter
  - Create a new function `honk` which
    logs the `LoudSound` event
  - The `honk` function should use the `onlyOwner` function modifier too
- `11-interface.sol` <!-- showDiff -->
  - Define an interface for the `SuperHonk` contract, named `ISuperHonk`
  - Are there any differences in the visibility modifiers?
- `12-reference-interface copy.sol` <!-- showDiff -->
  - Create a private state variable named `superHonk`
    that stores a reference to the `SuperHonk` contract
  - Modify the constructor to accept an address for the `SuperHonk` contract,
    and initialise `superHonk`
- `13-import.sol` <!-- showDiff -->
  - The `SuperHonk` contract and `ISuperHonk` interface
    are now in a different file `13-import-target.sol`
  - Import only `ISuperHonk` from this file

## What to do?

1. Read the code example - Initial
2. Identify the missing or contains errors
3. Complete/fix it
4. Run the tests to verify the fixes
5. Submit the fixes

## Submissions

Please follow the instructions given in the course, create a PR with the changes to the contracts and the tests pass. this in a public repo [Rootstock Developer Course](https://github.com/rsksmart/rootstock-academy-dev-course). The PR will be automatically reviewed by the Rootstock Developer Experience team.
