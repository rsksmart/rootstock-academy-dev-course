import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { parseEther } from "viem";

describe("09-function-modifier: Function Modifiers", function () {
  const contractName = "contracts/09-function-modifier.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/09-function-modifier.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have a modifier named 'onlyOwner'", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/modifier\s+onlyOwner/, "Should define 'modifier onlyOwner'");
  });

  it("should have 'onlyOwner' modifier with 'carId' parameter", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const modifierMatch = sourceCode.match(/modifier\s+onlyOwner\s*\([^)]*\)/);
    expect(modifierMatch).to.exist;
    
    const modifierSignature = modifierMatch![0];
    expect(modifierSignature).to.match(/uint256\s+carId/, "onlyOwner should take uint256 carId parameter");
  });

  it("should have 'onlyOwner' modifier with require statement for owner check", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const modifierMatch = sourceCode.match(/modifier\s+onlyOwner[^{]*\{([^}]*)\}/s);
    expect(modifierMatch).to.exist;
    
    const modifierBody = modifierMatch![1];
    expect(modifierBody).to.match(/require/, "Modifier should contain require statement");
    expect(modifierBody).to.match(/owner/, "Modifier should check owner");
    expect(modifierBody).to.match(/msg\.sender/, "Modifier should check msg.sender");
  });

  it("should have 'onlyOwner' modifier with underscore (_) placeholder", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const modifierMatch = sourceCode.match(/modifier\s+onlyOwner[^{]*\{([^}]*)\}/s);
    expect(modifierMatch).to.exist;
    
    const modifierBody = modifierMatch![1];
    expect(modifierBody).to.match(/_;/, "Modifier should have '_;' placeholder");
  });

  it("should have 'statusChange' function using 'onlyOwner' modifier", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+statusChange[^{]*/s);
    expect(functionMatch).to.exist;
    
    const functionSignature = functionMatch![0];
    expect(functionSignature).to.match(/onlyOwner\s*\(\s*carId\s*\)/, "statusChange should use onlyOwner(carId) modifier");
  });

  it("should NOT have owner check require in statusChange function body", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+statusChange[^{]*\{([^}]*)\}/s);
    expect(functionMatch).to.exist;
    
    const functionBody = functionMatch![1];
    
    const hasOwnerCheck = functionBody.match(/owner\s*==\s*msg\.sender|msg\.sender\s*==\s*owner/);
    expect(hasOwnerCheck).to.be.null;
  });

  it("should still have status change check in statusChange function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+statusChange[^{]*\{([^}]*)\}/s);
    expect(functionMatch).to.exist;
    
    const functionBody = functionMatch![1];
    expect(functionBody).to.match(/status.*!=.*newStatus|newStatus.*!=.*status/, "Should still check if status differs");
  });

  it("should reject statusChange from non-owner (modifier works)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const [owner, other] = await hre.viem.getWalletClients();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    try {
      await contract.write.statusChange([1n, 0], {
        account: other.account
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).to.match(/only owner|revert/i);
    }
  });

  it("should allow statusChange from owner (modifier works)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await contract.write.statusChange([1n, 0]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
  });

  it("should reject statusChange when status is the same (second require still works)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const car = await contract.read.cars([1n]);
    const currentStatus = car[2];
    
    try {
      await contract.write.statusChange([1n, currentStatus]);
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).to.match(/no change|revert/i);
    }
  });

  it("should successfully change status when all conditions are met", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const carBefore = await contract.read.cars([1n]);
    expect(carBefore[2]).to.equal(1);
    
    const hash = await contract.write.statusChange([1n, 0]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
    
    const carAfter = await contract.read.cars([1n]);
    expect(carAfter[2]).to.equal(0);
  });

  it("should have modifier defined with 'modifier' keyword", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const modifierCount = (sourceCode.match(/modifier\s+onlyOwner/g) || []).length;
    expect(modifierCount).to.be.greaterThan(0, "Should have at least one modifier definition");
  });

  it("should use the modifier pattern correctly (require before _)", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const modifierMatch = sourceCode.match(/modifier\s+onlyOwner[^{]*\{([^}]*)\}/s);
    expect(modifierMatch).to.exist;
    
    const modifierBody = modifierMatch![1];
    
    const requireIndex = modifierBody.indexOf("require");
    const underscoreIndex = modifierBody.indexOf("_;");
    
    expect(requireIndex).to.be.greaterThan(-1);
    expect(underscoreIndex).to.be.greaterThan(-1);
    expect(requireIndex).to.be.lessThan(underscoreIndex, "require should come before _;");
  });

  it("should compile successfully with function modifier", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

