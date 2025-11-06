import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { parseEther } from "viem";

describe("13-import: Import Statements", function () {
  const carsContractName = "contracts/13-import.sol:Cars";
  const superHonkContractName = "contracts/13-import-target.sol:SuperHonk";
  const carsContractPath = path.join(hre.config.paths.root, "contracts/13-import.sol");
  const targetContractPath = path.join(hre.config.paths.root, "contracts/13-import-target.sol");
  
  it("should have 13-import-target.sol file", async function () {
    const exists = fs.existsSync(targetContractPath);
    expect(exists).to.be.true;
  });

  it("should have ISuperHonk interface in 13-import-target.sol", async function () {
    const sourceCode = fs.readFileSync(targetContractPath, "utf8");
    expect(sourceCode).to.match(/interface\s+ISuperHonk/, "13-import-target.sol should have ISuperHonk interface");
  });

  it("should have SuperHonk contract in 13-import-target.sol", async function () {
    const sourceCode = fs.readFileSync(targetContractPath, "utf8");
    expect(sourceCode).to.match(/contract\s+SuperHonk/, "13-import-target.sol should have SuperHonk contract");
  });

  it("should have import statement in 13-import.sol", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    expect(sourceCode).to.match(/import/, "Should have 'import' statement");
  });

  it("should import from './13-import-target.sol'", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    expect(sourceCode).to.match(/import.*["']\.\/13-import-target\.sol["']/, "Should import from './13-import-target.sol'");
  });

  it("should import ISuperHonk specifically", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    expect(sourceCode).to.match(/import\s*\{\s*ISuperHonk\s*\}/, "Should import { ISuperHonk }");
  });

  it("should NOT have ISuperHonk interface definition in 13-import.sol", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    
    const hasInterfaceDefinition = sourceCode.match(/interface\s+ISuperHonk\s*\{/);
    expect(hasInterfaceDefinition).to.be.null;
  });

  it("should NOT have SuperHonk contract definition in 13-import.sol", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    
    const hasSuperHonkContract = sourceCode.match(/contract\s+SuperHonk/);
    expect(hasSuperHonkContract).to.be.null;
  });

  it("should still use ISuperHonk type in Cars contract", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    
    expect(sourceCode).to.match(/ISuperHonk\s+private\s+superHonk/, "Should use ISuperHonk type for superHonk variable");
  });

  it("should deploy SuperHonk from 13-import-target.sol", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    expect(superHonk.address).to.be.a("string");
    expect(superHonk.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should deploy Cars from 13-import.sol with imported interface", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    
    expect(cars.address).to.be.a("string");
    expect(cars.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should work end-to-end with imported interface", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    const publicClient = await hre.viem.getPublicClient();
    
    await cars.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const countBefore = await superHonk.read.count();
    expect(countBefore).to.equal(0n);
    
    const hash = await cars.write.honk([1n, true]);
    await publicClient.waitForTransactionReceipt({ hash });
    
    const countAfter = await superHonk.read.count();
    expect(countAfter).to.equal(1n);
  });

  it("should have Cars contract with all expected functionality", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    
    expect(cars.read.numCars).to.be.a("function");
    expect(cars.write.addCar).to.be.a("function");
    expect(cars.write.statusChange).to.be.a("function");
    expect(cars.write.honk).to.be.a("function");
  });

  it("should successfully call functions that use imported interface", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    const publicClient = await hre.viem.getPublicClient();
    
    await cars.write.addCar(["0x00ff00", 2], {
      value: parseEther("0.2")
    });
    
    const hash1 = await cars.write.honk([1n, false]);
    await publicClient.waitForTransactionReceipt({ hash: hash1 });
    
    let count = await superHonk.read.count();
    expect(count).to.equal(0n);
    
    const hash2 = await cars.write.honk([1n, true]);
    await publicClient.waitForTransactionReceipt({ hash: hash2 });
    
    count = await superHonk.read.count();
    expect(count).to.equal(1n);
  });

  it("should use relative path import (starts with ./)", async function () {
    const sourceCode = fs.readFileSync(carsContractPath, "utf8");
    
    const importMatch = sourceCode.match(/import.*from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/);
    expect(importMatch).to.exist;
    
    const importPath = importMatch![1] || importMatch![2];
    expect(importPath).to.match(/^\.\//, "Import path should start with ./");
  });

  it("should compile successfully with import", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    expect(cars.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

