import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";

describe("05-dynamic-variables: Dynamic Variables", function () {
  const contractName = "contracts/05-dynamic-variables.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/05-dynamic-variables.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a public uint256 variable 'numCars'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.numCars).to.be.a("function");
    
    const value = await contract.read.numCars();
    expect(value).to.be.a("bigint");
  });

  it("should initialize numCars to 0", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const numCars = await contract.read.numCars();
    expect(numCars).to.equal(0n);
  });

  it("should have numCars variable of type uint256 in source code", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/uint256\s+public\s+numCars/, "Should have 'uint256 public numCars' declaration");
  });

  it("should have a public mapping variable 'cars'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.cars).to.be.a("function");
  });

  it("should have mapping that accepts uint256 as key", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const car = await contract.read.cars([0n]);
    expect(car).to.exist;
  });

  it("should have mapping that returns Car struct", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const car = await contract.read.cars([0n]);
    
    expect(car).to.be.an("array");
    expect(car.length).to.equal(4, "Car struct should have 4 fields");
  });

  it("should have mapping(uint256 => Car) in source code", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/mapping\s*\(\s*uint256\s*=>\s*Car\s*\)\s+public\s+cars/, 
      "Should have 'mapping(uint256 => Car) public cars' declaration");
  });

  it("should return default/empty Car struct from mapping for uninitialized keys", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const car = await contract.read.cars([999n]);
    
    expect(car[1]).to.equal(0); // doors = 0
    expect(car[2]).to.equal(0); // status = driving (0)
    expect(car[3]).to.match(/^0x[0]+$/); // owner = address(0)
  });

  it("should have Car struct and CarStatus enum defined", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/struct\s+Car\s*\{/, "Should have Car struct");
    expect(sourceCode).to.match(/enum\s+CarStatus\s*\{/, "Should have CarStatus enum");
  });

  it("should compile successfully with dynamic variables", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

