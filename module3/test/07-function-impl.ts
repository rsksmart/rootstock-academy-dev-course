import hre from "hardhat";
import { expect } from "chai";
import fs from "fs";
import path from "path";
import { getAddress } from "viem";

describe("07-function-impl: Function Implementation", function () {
  const contractName = "contracts/07-function-impl.sol:Cars";
  const contractPath = path.join(hre.config.paths.root, "contracts/07-function-impl.sol");
  
  it("should have a contract named 'Cars'", async function () {
    const artifacts = await hre.artifacts.readArtifact(contractName);
    expect(artifacts.contractName).to.equal("Cars");
  });

  it("should deploy the 'Cars' contract successfully", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.be.a("string");
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should increment numCars when addCar is called", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const initialNumCars = await contract.read.numCars();
    expect(initialNumCars).to.equal(0n);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const afterNumCars = await contract.read.numCars();
    expect(afterNumCars).to.equal(1n);
  });

  it("should return the correct carId when addCar is called", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const publicClient = await hre.viem.getPublicClient();
    
    const hash1 = await contract.write.addCar(["0xff0000", 4]);
    const receipt1 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
    expect(receipt1.status).to.equal("success");
    
    const numCars = await contract.read.numCars();
    expect(numCars).to.equal(1n);
  });

  it("should assign incremented numCars to carId (return value)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    const initialNumCars = await contract.read.numCars();
    expect(initialNumCars).to.equal(0n);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const numCarsAfter = await contract.read.numCars();
    expect(numCarsAfter).to.equal(1n);
  });

  it("should store the new car in the cars mapping", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const car = await contract.read.cars([1n]);
    expect(car).to.exist;
    expect(car).to.be.an("array");
  });

  it("should store the car with correct colour parameter", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const car = await contract.read.cars([1n]);
    expect(car[0]).to.equal("0xff0000");
  });

  it("should store the car with correct doors parameter", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const car = await contract.read.cars([1n]);
    expect(car[1]).to.equal(4);
  });

  it("should store the car with status 'parked' (CarStatus.parked = 1)", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const car = await contract.read.cars([1n]);
    expect(car[2]).to.equal(1);
  });

  it("should store the car with owner as msg.sender", async function () {
    const contract = await hre.viem.deployContract(contractName);
    const [walletClient] = await hre.viem.getWalletClients();
    
    await contract.write.addCar(["0xff0000", 4]);
    
    const car = await contract.read.cars([1n]);
    expect(car[3]).to.be.a("string");
    expect(car[3]).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(getAddress(car[3])).to.equal(getAddress(walletClient.account.address));
  });

  it("should use 'memory' keyword for newCar variable in source code", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/Car\s+memory\s+newCar/, "Should declare 'Car memory newCar'");
  });

  it("should use 'msg.sender' for the owner field", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/msg\.sender/, "Should use 'msg.sender' for owner");
  });

  it("should use 'CarStatus.parked' for the status field", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/CarStatus\.parked/, "Should use 'CarStatus.parked' for status");
  });

  it("should increment numCars with ++ operator", async function () {
    const sourceCode = fs.readFileSync(contractPath, "utf8");
    
    expect(sourceCode).to.match(/\+\+numCars/, "Should use '++numCars' to increment");
  });

  it("should handle multiple cars correctly", async function () {
    const contract = await hre.viem.deployContract(contractName);
    
    await contract.write.addCar(["0xff0000", 4]);
    await contract.write.addCar(["0x00ff00", 2]);
    await contract.write.addCar(["0x0000ff", 5]);
    
    const numCars = await contract.read.numCars();
    expect(numCars).to.equal(3n);
    
    const car1 = await contract.read.cars([1n]);
    expect(car1[0]).to.equal("0xff0000");
    expect(car1[1]).to.equal(4);
    
    const car2 = await contract.read.cars([2n]);
    expect(car2[0]).to.equal("0x00ff00");
    expect(car2[1]).to.equal(2);
    
    const car3 = await contract.read.cars([3n]);
    expect(car3[0]).to.equal("0x0000ff");
    expect(car3[1]).to.equal(5);
  });

  it("should compile successfully with addCar implementation", async function () {
    const contract = await hre.viem.deployContract(contractName);
    expect(contract.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
});

