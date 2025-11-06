import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";

describe("06-function-stub: Function Stub", function () {
  const contractName = "contracts/06-function-stub.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/06-function-stub.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a function named 'addCar'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    );
    
    expect(addCarFunction).to.exist;
  });

  it("should have 'addCar' function with 'function' keyword in source code", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/function\s+addCar/, "Should declare 'function addCar'");
  });

  it("should have 'addCar' function that takes 2 parameters", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.inputs.length).to.equal(2, "addCar should have 2 parameters");
  });

  it("should have 'addCar' function with first parameter 'colour' of type bytes3", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.inputs[0].name).to.equal("colour");
    expect(addCarFunction!.inputs[0].type).to.equal("bytes3");
  });

  it("should have 'addCar' function with second parameter 'doors' of type uint8", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.inputs[1].name).to.equal("doors");
    expect(addCarFunction!.inputs[1].type).to.equal("uint8");
  });

  it("should have 'addCar' function that is public (invokable by EOAs or SCs)", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+addCar[^{]*/s);
    expect(functionMatch).to.exist;
    
    const functionSignature = functionMatch![0];
    expect(functionSignature).to.match(/\bpublic\b/, "addCar function should be 'public'");
  });

  it("should have 'addCar' function that returns uint256", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.outputs.length).to.equal(1, "addCar should return 1 value");
    expect(addCarFunction!.outputs[0].type).to.equal("uint256");
  });

  it("should have 'addCar' function that returns 'carId' named return value", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.outputs[0].name).to.equal("carId");
  });

  it("should have 'addCar' function that is callable", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.write.addCar).to.be.a("function");
  });

  it("should be able to call 'addCar' function (even if empty implementation)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const [walletClient] = await hre.viem.getWalletClients();
    
    const hash = await contract.write.addCar(["0x000000", 4]);
    expect(hash).to.be.a("string");
    expect(hash).to.match(/^0x[a-fA-F0-9]{64}$/);
  });

  it("should compile successfully with addCar function stub", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

