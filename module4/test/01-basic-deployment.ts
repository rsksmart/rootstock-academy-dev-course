import { ethers } from "hardhat";
import { expect } from "chai";

describe("01-basic-deployment: Testing Contract Deployment", function () {
  
  it("should deploy the Cars contract successfully", async function () {
    // Get contract factory
    const Cars = await ethers.getContractFactory("Cars");
    
    // Deploy the contract
    const cars = await Cars.deploy();
    await cars.waitForDeployment();

    // Verify the contract address exists
    const address = await cars.getAddress();
    expect(address).to.be.a("string");
    expect(address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should initialize numCars to 0", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    // Read the numCars state variable
    const numCars = await cars.numCars();
    
    // Verify it's initialized to 0
    expect(numCars).to.equal(0);
  });

  it("should have a public numCars variable", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    // Verify numCars is a function (public getter)
    expect(cars.numCars).to.be.a("function");
  });

  it("should have an addCar function", async function () {
    const Cars = await ethers.getContractFactory("Cars");
    const cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    // Verify addCar function exists
    expect(cars.addCar).to.be.a("function");
  });

});

