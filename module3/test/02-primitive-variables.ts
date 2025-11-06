import hre from "hardhat";
import { expect } from "chai";
import { getAddress } from "viem";

describe("02-primitive-variables: Primitive Variables", function () {
  const contractName = "contracts/02-primitive-variables.sol:Cars";
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a public bool variable 'isBlack'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.isBlack).to.be.a("function");
    
    const value = await contract.read.isBlack();
    expect(typeof value).to.equal("boolean");
  });

  it("should have a public uint256 variable 'doors'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.doors).to.be.a("function");
    
    const value = await contract.read.doors();
    expect(value).to.be.a("bigint");
  });

  it("should have a public address variable 'owner'", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.owner).to.be.a("function");
    
    const value = await contract.read.owner();
    expect(value).to.be.a("string");
    expect(value).to.match(/^0x[a-fA-F0-9]{40}$/);
    
    expect(() => getAddress(value)).to.not.throw();
  });
});

