import hre from "hardhat";
import { expect } from "chai";
import { getAddress } from "viem";

describe("03-enum: Enumerated Values", function () {
  const contractName = "contracts/03-enum.sol:Cars";
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a public bytes3 variable 'colour'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.read.colour).to.be.a("function");
    const value = await contract.read.colour();
    expect(value).to.be.a("string");
  });

  it("should have a public uint8 variable 'doors'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.read.doors).to.be.a("function");
    const value = await contract.read.doors();
    expect(value).to.be.a("number");
  });

  it("should have a public address variable 'owner'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.read.owner).to.be.a("function");
    const value = await contract.read.owner();
    expect(value).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(() => getAddress(value)).to.not.throw();
  });

  it("should have a public CarStatus enum variable 'status'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.read.status).to.be.a("function");
    const value = await contract.read.status();
    expect(value).to.be.a("number");
    expect([0, 1]).to.include(value);
  });

  it("should have CarStatus enum with 'driving' (0) and 'parked' (1) values", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const enumEvents = artifacts.abi.filter((item: any) => 
      item.type === 'function' && item.name === 'status'
    );
    
    expect(enumEvents.length).to.be.greaterThan(0, "CarStatus enum should exist via status getter");
    
    const contract = await hre.viem.deployContract(contractName);
    const status = await contract.read.status();
    
    expect([0, 1]).to.include(status, "Status should be either 0 (driving) or 1 (parked)");
  });

  it("should initialize status with a valid CarStatus enum value", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const status = await contract.read.status();

    expect(status).to.equal(0);
  });
});

