import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { parseEther } from "viem";

describe("12-reference-interface: Reference Interface", function () {
  const carsContractName = "contracts/12-reference-interface.sol:Cars";
  const superHonkContractName = "contracts/12-reference-interface.sol:SuperHonk";
  const contractPath = path.join(hre.config.paths.root, "contracts/12-reference-interface.sol");
  
  it("should have Cars contract", async function () {
    const artifacts = await hre.artifacts.readArtifact(carsContractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should have SuperHonk contract", async function () {
    const artifacts = await hre.artifacts.readArtifact(superHonkContractName);
    expect(artifacts.contractName).to.equal("SuperHonk");
  });

  it("should have 'superHonk' variable of type ISuperHonk in source code", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const carsMatch = sourceCode.match(/contract\s+Cars\s*\{([^]*?)^}/ms);
    expect(carsMatch).to.exist;
    
    const carsBody = carsMatch![1];
    expect(carsBody).to.match(/ISuperHonk.*superHonk/, "Should have variable of type ISuperHonk named superHonk");
  });

  it("should have 'superHonk' variable declared as private", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const carsMatch = sourceCode.match(/contract\s+Cars\s*\{([^]*?)^}/ms);
    expect(carsMatch).to.exist;
    
    const carsBody = carsMatch![1];
    expect(carsBody).to.match(/ISuperHonk\s+private\s+superHonk/, "superHonk should be declared as private");
  });

  it("should have constructor with address parameter", async function () {
    const artifacts = await hre.artifacts.readArtifact(carsContractName);
    
    const constructor = artifacts.abi.find(
      (item: any) => item.type === 'constructor'
    ) as any;
    
    expect(constructor).to.exist;
    expect(constructor!.inputs.length).to.equal(1, "Constructor should have 1 parameter");
    expect(constructor!.inputs[0].type).to.equal("address");
  });

  it("should have constructor parameter named 'superHonkAddress'", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const constructorMatch = sourceCode.match(/constructor\s*\([^)]*\)/);
    expect(constructorMatch).to.exist;
    
    const constructorSignature = constructorMatch![0];
    expect(constructorSignature).to.match(/address.*superHonkAddress/, "Constructor parameter should be named superHonkAddress");
  });

  it("should initialize superHonk in constructor", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const constructorMatch = sourceCode.match(/constructor[^{]*\{([^}]*)\}/s);
    expect(constructorMatch).to.exist;
    
    const constructorBody = constructorMatch![1];
    expect(constructorBody).to.match(/superHonk\s*=/, "Constructor should initialize superHonk");
  });

  it("should cast address to ISuperHonk type in constructor", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const constructorMatch = sourceCode.match(/constructor[^{]*\{([^}]*)\}/s);
    expect(constructorMatch).to.exist;
    
    const constructorBody = constructorMatch![1];
    expect(constructorBody).to.match(/ISuperHonk\s*\(\s*superHonkAddress\s*\)/, "Should cast address to ISuperHonk");
  });

  it("should deploy SuperHonk contract successfully", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    expect(superHonk.address).to.be.a("string");
    expect(superHonk.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should deploy Cars contract with SuperHonk address", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    
    expect(cars.address).to.be.a("string");
    expect(cars.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have 'honk' function with 'isLoud' parameter", async function () {
    const artifacts = await hre.artifacts.readArtifact(carsContractName);
    
    const honkFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'honk'
    ) as any;
    
    expect(honkFunction).to.exist;
    expect(honkFunction!.inputs.length).to.equal(2, "honk should now have 2 parameters (carId and isLoud)");
  });

  it("should have 'honk' function with second parameter 'isLoud' of type bool", async function () {
    const artifacts = await hre.artifacts.readArtifact(carsContractName);
    
    const honkFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'honk'
    ) as any;
    
    expect(honkFunction).to.exist;
    expect(honkFunction!.inputs[1].name).to.equal("isLoud");
    expect(honkFunction!.inputs[1].type).to.equal("bool");
  });

  it("should call superHonk.honk() in honk function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const carsMatch = sourceCode.match(/contract\s+Cars\s*\{([^]*?)^}/ms);
    expect(carsMatch).to.exist;
    
    const carsBody = carsMatch![1];
    expect(carsBody).to.match(/superHonk\.honk\s*\(\s*\)/, "Should call superHonk.honk()");
  });

  it("should conditionally call superHonk.honk() based on isLoud", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const carsMatch = sourceCode.match(/contract\s+Cars\s*\{([^]*?)^}/ms);
    expect(carsMatch).to.exist;
    
    const carsBody = carsMatch![1];
    expect(carsBody).to.match(/if\s*\(\s*isLoud\s*\)/, "Should check isLoud with if statement");
  });

  it("should work end-to-end: honk with isLoud = false", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    const publicClient = await hre.viem.getPublicClient();
    
    await cars.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const countBefore = await superHonk.read.count();
    
    const hash = await cars.write.honk([1n, false]);
    await publicClient.waitForTransactionReceipt({ hash });
    
    const countAfter = await superHonk.read.count();
    expect(countAfter).to.equal(countBefore);
  });

  it("should work end-to-end: honk with isLoud = true calls SuperHonk", async function () {
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

  it("should increment SuperHonk count multiple times", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    
    await cars.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    await cars.write.honk([1n, true]);
    await cars.write.honk([1n, true]);
    await cars.write.honk([1n, true]);
    
    const count = await superHonk.read.count();
    expect(count).to.equal(3n);
  });

  it("should emit both CarHonk and LoudSound events when isLoud = true", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    const publicClient = await hre.viem.getPublicClient();
    
    await cars.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await cars.write.honk([1n, true]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    expect(receipt.logs.length).to.be.greaterThan(1, "Should emit multiple events");
  });

  it("should store reference to interface type, not concrete contract", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const carsMatch = sourceCode.match(/contract\s+Cars\s*\{([^]*?)^}/ms);
    expect(carsMatch).to.exist;
    
    const carsBody = carsMatch![1];
    
    const usesInterface = carsBody.match(/ISuperHonk\s+private\s+superHonk/);
    expect(usesInterface).to.exist;
  });

  it("should compile successfully with interface reference", async function () {
    const superHonk = await hre.viem.deployContract(superHonkContractName);
    const cars = await hre.viem.deployContract(carsContractName, [superHonk.address]);
    expect(cars.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

