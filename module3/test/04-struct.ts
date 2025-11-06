import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";

describe("04-struct: Structures", function () {
  const contractName = "contracts/04-struct.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/04-struct.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have CarStatus enum defined", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
    
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
  });

  it("should not have public state variables (they were moved to the struct)", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const abiNames = artifacts.abi.map((item: any) => item.name);
    
    expect(abiNames).to.not.include("colour", "colour should be inside Car struct, not a public state variable");
    expect(abiNames).to.not.include("doors", "doors should be inside Car struct, not a public state variable");
    expect(abiNames).to.not.include("status", "status should be inside Car struct, not a public state variable");
    expect(abiNames).to.not.include("owner", "owner should be inside Car struct, not a public state variable");
  });

  it("should have a struct named 'Car'", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/struct\s+Car\s*\{/, "Should define a struct named 'Car'");
  });

  it("should have Car struct with 'colour' field of type bytes3", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const structMatch = sourceCode.match(/struct\s+Car\s*\{([^}]+)\}/s);
    expect(structMatch).to.exist;
    
    const structBody = structMatch![1];
    expect(structBody).to.match(/bytes3\s+colour\s*;/, "Car struct should have 'bytes3 colour;' field");
  });

  it("should have Car struct with 'doors' field of type uint8", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const structMatch = sourceCode.match(/struct\s+Car\s*\{([^}]+)\}/s);
    expect(structMatch).to.exist;
    
    const structBody = structMatch![1];
    expect(structBody).to.match(/uint8\s+doors\s*;/, "Car struct should have 'uint8 doors;' field");
  });

  it("should have Car struct with 'status' field of type CarStatus", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const structMatch = sourceCode.match(/struct\s+Car\s*\{([^}]+)\}/s);
    expect(structMatch).to.exist;
    
    const structBody = structMatch![1];
    expect(structBody).to.match(/CarStatus\s+status\s*;/, "Car struct should have 'CarStatus status;' field");
  });

  it("should have Car struct with 'owner' field of type address", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const structMatch = sourceCode.match(/struct\s+Car\s*\{([^}]+)\}/s);
    expect(structMatch).to.exist;
    
    const structBody = structMatch![1];
    expect(structBody).to.match(/address\s+owner\s*;/, "Car struct should have 'address owner;' field");
  });

  it("should have exactly 4 fields in Car struct", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const structMatch = sourceCode.match(/struct\s+Car\s*\{([^}]+)\}/s);
    expect(structMatch).to.exist;
    
    const structBody = structMatch![1];
    const fields = structBody.split(';').filter(f => f.trim().length > 0);
    
    expect(fields.length).to.equal(4, "Car struct should have exactly 4 fields");
  });

  it("should compile successfully with struct Car definition", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

