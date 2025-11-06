import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { parseEther, decodeEventLog } from "viem";

describe("10-event-logs: Event Logs", function () {
  const contractName = "contracts/10-event-logs.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/10-event-logs.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should have an event named 'CarHonk' defined", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const carHonkEvent = artifacts.abi.find(
      (item: any) => item.type === 'event' && item.name === 'CarHonk'
    );
    
    expect(carHonkEvent).to.exist;
  });

  it("should have 'event' keyword in source code for CarHonk", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/event\s+CarHonk/, "Should define 'event CarHonk'");
  });

  it("should have CarHonk event with 'carId' parameter", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const carHonkEvent = artifacts.abi.find(
      (item: any) => item.type === 'event' && item.name === 'CarHonk'
    ) as any;
    
    expect(carHonkEvent).to.exist;
    expect(carHonkEvent!.inputs.length).to.equal(1, "CarHonk should have 1 parameter");
    expect(carHonkEvent!.inputs[0].name).to.equal("carId");
    expect(carHonkEvent!.inputs[0].type).to.equal("uint256");
  });

  it("should have 'carId' parameter as indexed in CarHonk event", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const carHonkEvent = artifacts.abi.find(
      (item: any) => item.type === 'event' && item.name === 'CarHonk'
    ) as any;
    
    expect(carHonkEvent).to.exist;
    expect(carHonkEvent!.inputs[0].indexed).to.equal(true, "carId should be indexed");
  });

  it("should have 'indexed' keyword in CarHonk event definition", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const eventMatch = sourceCode.match(/event\s+CarHonk[^;]*/);
    expect(eventMatch).to.exist;
    
    const eventDefinition = eventMatch![0];
    expect(eventDefinition).to.match(/indexed/, "CarHonk event should use 'indexed' keyword");
  });

  it("should have a function named 'honk'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const honkFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'honk'
    );
    
    expect(honkFunction).to.exist;
  });

  it("should have 'honk' function with 'carId' parameter", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    const honkFunction = artifacts.abi.find(
      (item: any) => item.type === 'function' && item.name === 'honk'
    ) as any;
    
    expect(honkFunction).to.exist;
    expect(honkFunction!.inputs.length).to.equal(1, "honk should have 1 parameter");
    expect(honkFunction!.inputs[0].name).to.equal("carId");
    expect(honkFunction!.inputs[0].type).to.equal("uint256");
  });

  it("should have 'honk' function using 'onlyOwner' modifier", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+honk[^{]*/s);
    expect(functionMatch).to.exist;
    
    const functionSignature = functionMatch![0];
    expect(functionSignature).to.match(/onlyOwner/, "honk function should use onlyOwner modifier");
  });

  it("should have 'emit' statement in honk function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+honk[^}]*\{([^}]*)\}/s);
    expect(functionMatch).to.exist;
    
    const functionBody = functionMatch![1];
    expect(functionBody).to.match(/emit/, "honk function should use 'emit' keyword");
  });

  it("should emit CarHonk event in honk function", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+honk[^}]*\{([^}]*)\}/s);
    expect(functionMatch).to.exist;
    
    const functionBody = functionMatch![1];
    expect(functionBody).to.match(/emit\s+CarHonk/, "honk function should emit CarHonk event");
  });

  it("should emit CarHonk with carId parameter", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    const functionMatch = sourceCode.match(/function\s+honk[^}]*\{([^}]*)\}/s);
    expect(functionMatch).to.exist;
    
    const functionBody = functionMatch![1];
    expect(functionBody).to.match(/emit\s+CarHonk\s*\(\s*carId\s*\)/, "Should emit CarHonk(carId)");
  });

  it("should reject honk from non-owner", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const [owner, other] = await hre.viem.getWalletClients();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    try {
      await contract.write.honk([1n], {
        account: other.account
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).to.match(/only owner|revert/i);
    }
  });

  it("should allow honk from owner", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await contract.write.honk([1n]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).to.equal("success");
  });

  it("should emit CarHonk event when honk is called", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await contract.write.honk([1n]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    expect(receipt.logs.length).to.be.greaterThan(0, "Should emit at least one event");
    
    const carHonkLog = receipt.logs[0];
    expect(carHonkLog).to.exist;
  });

  it("should emit CarHonk event with correct carId", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    const artifacts = await hre.artifacts.readArtifact(contractName);
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    const hash = await contract.write.honk([1n]);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    const carHonkEvent = artifacts.abi.find(
      (item: any) => item.type === 'event' && item.name === 'CarHonk'
    ) as any;
    
    const log = receipt.logs[0];
    const decodedLog = decodeEventLog({
      abi: [carHonkEvent],
      data: log.data,
      topics: log.topics
    });
    
    expect((decodedLog as any).eventName).to.equal("CarHonk");
    expect((decodedLog as any).args.carId).to.equal(1n);
  });

  it("should emit multiple CarHonk events for different cars", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    await contract.write.addCar(["0xff0000", 4], {
      value: parseEther("0.2")
    });
    
    await contract.write.addCar(["0x00ff00", 2], {
      value: parseEther("0.2")
    });
    
    const hash1 = await contract.write.honk([1n]);
    const receipt1 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
    expect(receipt1.logs.length).to.be.greaterThan(0);
    
    const hash2 = await contract.write.honk([2n]);
    const receipt2 = await publicClient.waitForTransactionReceipt({ hash: hash2 });
    expect(receipt2.logs.length).to.be.greaterThan(0);
  });

  it("should compile successfully with events", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

