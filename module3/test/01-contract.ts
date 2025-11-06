import hre from "hardhat";
import { expect } from "chai";

describe("01-contract: Basic Contract Structure", function () {
  
  it("should have a contract named 'Abc'", async function () {
    const artifacts = await hre.artifacts.readArtifact("Abc");
    expect(artifacts.contractName).to.equal("Abc");
  });

  it("should deploy the 'Abc' contract successfully", async function () {
    const contract = await hre.viem.deployContract("Abc");
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a constructor", async function () {
    const contract = await hre.viem.deployContract("Abc");
    const publicClient = await hre.viem.getPublicClient();
    
    const code = await publicClient.getBytecode({ address: contract.address });
    
    expect(code).to.exist;
    expect(code).to.not.equal("0x");
  });
});