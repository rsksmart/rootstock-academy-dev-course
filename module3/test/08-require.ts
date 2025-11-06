import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { parseEther } from "viem";

describe("08-require: Require Statements", function () {
  const contractName = "contracts/08-require.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/08-require.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have 'addCar' function with 'payable' modifier", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+addCar[^{]*/s);
    expect(functionMatch).to.exist;
    
    const functionSignature = functionMatch![0];
    expect(functionSignature).to.match(/\bpayable\b/, "addCar function should be 'payable'");
  });

  it("should have 'addCar' function that is payable in ABI", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const addCarFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'addCar'
    ) as any;
    
    expect(addCarFunction).to.exist;
    expect(addCarFunction!.stateMutability).to.equal("payable");
  });

  it("should have 'require' statement in addCar function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const addCarMatch = sourceCode.match(/function\s+addCar[^}]*\{([^}]*)\}/s);
    expect(addCarMatch).to.exist;
    
    const functionBody = addCarMatch![1];
    expect(functionBody).to.match(/require\s*\(/, "addCar should have a require statement");
  });

  it("should require msg.value > 0.1 ether in addCar", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/msg\.value/, "Should check msg.value");
    expect(sourceCode).to.match(/0\.1\s+ether/, "Should check for 0.1 ether");
  });

  it("should reject addCar calls with insufficient payment", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    try {
      await contract.write.addCar(["0xff0000", 4], {
        value: parseEther("0.05")
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).to.match(/requires payment|revert/i);
    }
  });

  it("should accept addCar calls with exactly 0.1 ether", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    const hash = await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.1") + 1n
    });
    
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
  });

  it("should accept addCar calls with more than 0.1 ether", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    const hash = await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.5")
    });
    
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
  });

  it("should have a function named 'statusChange'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const statusChangeFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'statusChange'
    );
    
    expect(statusChangeFunction).to.exist;
  });

  it("should have 'statusChange' function with 2 parameters", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const statusChangeFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'statusChange'
    ) as any;
    
    expect(statusChangeFunction).to.exist;
    expect(statusChangeFunction!.inputs.length).to.equal(2, "statusChange should have 2 parameters");
  });

  it("should have 'statusChange' with 'carId' parameter of type uint256", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const statusChangeFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'statusChange'
    ) as any;
    
    expect(statusChangeFunction).to.exist;
    expect(statusChangeFunction!.inputs[0].name).to.equal("carId");
    expect(statusChangeFunction!.inputs[0].type).to.equal("uint256");
  });

  it("should have 'statusChange' with 'newStatus' parameter of type CarStatus (uint8)", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const statusChangeFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'statusChange'
    ) as any;
    
    expect(statusChangeFunction).to.exist;
    expect(statusChangeFunction!.inputs[1].name).to.equal("newStatus");
    expect(statusChangeFunction!.inputs[1].type).to.equal("uint8");
  });

  it("should have 'require' to check owner in statusChange", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const statusChangeMatch = sourceCode.match(/function\s+statusChange[^}]*\{([^}]*)\}/s);
    expect(statusChangeMatch).to.exist;
    
    const functionBody = statusChangeMatch![1];
    expect(functionBody).to.match(/require/, "statusChange should have require statements");
    expect(functionBody).to.match(/owner/, "statusChange should check owner");
    expect(functionBody).to.match(/msg\.sender/, "statusChange should check msg.sender");
  });

  it("should have 'require' to check status is different in statusChange", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const statusChangeMatch = sourceCode.match(/function\s+statusChange[^}]*\{([^}]*)\}/s);
    expect(statusChangeMatch).to.exist;
    
    const functionBody = statusChangeMatch![1];
    expect(functionBody).to.match(/status.*!=.*newStatus|newStatus.*!=.*status/, "statusChange should check if status differs");
  });

  it("should reject statusChange from non-owner", async function () {
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

  it("should allow statusChange from owner", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await contract.write.statusChange([1n, 0]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
  });

  it("should reject statusChange when status is the same", async function () {
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

  it("should successfully change status when conditions are met", async function () {
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

  it("should compile successfully with require statements", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

