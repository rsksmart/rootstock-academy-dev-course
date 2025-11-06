import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";

describe("11-interface: Interfaces", function () {
  const contractName = "contracts/11-interface.sol:SuperHonk";
  const contractPath = path.join(hre.config.paths.root, "contracts/11-interface.sol");
  
  it("should have an interface named 'ISuperHonk'", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/interface\s+ISuperHonk/, "Should define 'interface ISuperHonk'");
  });

  it("should have ISuperHonk interface with 'count' function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/function\s+count/, "Interface should have 'count' function");
  });

  it("should have 'count' function with 'external' visibility in interface", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/function\s+count\s*\(\s*\)\s+external/, "count should be 'external' in interface");
  });

  it("should have 'count' function with 'view' modifier in interface", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/function\s+count\s*\(\s*\)\s+external\s+view/, "count should be 'view' in interface");
  });

  it("should have 'count' function returning uint256 in interface", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/returns\s*\(\s*uint256\s*\)/, "count should return uint256");
  });

  it("should have ISuperHonk interface with 'honk' function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/function\s+honk/, "Interface should have 'honk' function");
  });

  it("should have 'honk' function with 'external' visibility in interface", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    expect(interfaceBody).to.match(/function\s+honk\s*\(\s*\)\s+external/, "honk should be 'external' in interface");
  });

  it("should have SuperHonk contract implementing ISuperHonk interface", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/contract\s+SuperHonk\s+is\s+ISuperHonk/, "SuperHonk should implement ISuperHonk with 'is' keyword");
  });

  it("should deploy SuperHonk contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have SuperHonk contract with public 'count' variable", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.read.count).to.be.a("function");
    
    const count = await contract.read.count();
    expect(count).to.be.a("bigint");
  });

  it("should have SuperHonk contract with 'honk' function", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    expect(contract.write.honk).to.be.a("function");
  });

  it("should initialize count to 0 in SuperHonk", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const count = await contract.read.count();
    expect(count).to.equal(0n);
  });

  it("should increment count when honk is called", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    const countBefore = await contract.read.count();
    expect(countBefore).to.equal(0n);
    
    const hash = await contract.write.honk();
    await publicClient.waitForTransactionReceipt({ hash });
    
    const countAfter = await contract.read.count();
    expect(countAfter).to.equal(1n);
  });

  it("should emit LoudSound event when honk is called", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    const hash = await contract.write.honk();
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    expect(receipt.logs.length).to.be.greaterThan(0, "Should emit at least one event");
  });

  it("should have functions in interface without implementation (no body)", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    
    const hasFunctionBodies = interfaceBody.match(/function[^;]*\{/);
    expect(hasFunctionBodies).to.be.null;
  });

  it("should use 'external' visibility in interface (not 'public')", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const interfaceMatch = sourceCode.match(/interface\s+ISuperHonk\s*\{([^}]*)\}/s);
    expect(interfaceMatch).to.exist;
    
    const interfaceBody = interfaceMatch![1];
    
    const hasPublic = interfaceBody.match(/\bpublic\b/);
    expect(hasPublic).to.be.null;
    
    expect(interfaceBody).to.match(/external/, "Interface functions should use 'external' visibility");
  });

  it("should have SuperHonk implementing all interface functions", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const superHonkMatch = sourceCode.match(/contract\s+SuperHonk[^{]*\{([^]*?)^}/ms);
    expect(superHonkMatch).to.exist;
    
    const contractBody = superHonkMatch![1];
    expect(contractBody).to.match(/function\s+honk/, "SuperHonk should implement honk function");
  });

  it("should compile successfully with interface", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

