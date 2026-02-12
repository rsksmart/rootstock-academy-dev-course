import { ethers } from "hardhat";
import { expect } from "chai";

describe("01-basic-deployment: Testing Contract Deployment", function () {
  
  it("should deploy the Cars contract successfully", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    const address = await cars.getAddress();
    expect(address).to.be.a("string");
    expect(address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should initialize numCars to 0", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    const numCars = await cars.numCars();
    expect(numCars).to.equal(0);
  });

  it("should have a public numCars variable", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    expect(cars.numCars).to.be.a("function");
  });

  it("should have an addCar function", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    expect(cars.addCar).to.be.a("function");
  });

});
