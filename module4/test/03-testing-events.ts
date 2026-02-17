import { ethers } from "hardhat";
import { expect } from "chai";

describe("03-testing-events: Testing Events and Logs", function () {
  let cars: any;

  beforeEach(async () => {
    const Cars = await ethers.getContractFactory("Cars");
    cars = await Cars.deploy();
    await cars.waitForDeployment();
  });

  it("should emit CarAdded event when adding a car", async function () {
    const [owner] = await ethers.getSigners();

    // Test that the function emits the event
    await expect(cars.addCar("0xff0000", 4))
      .to.emit(cars, "CarAdded")
      .withArgs(1, owner.address);
  });

  it("should emit event with correct carId", async function () {
    const [owner] = await ethers.getSigners();
    
    // First car should have ID 1
    await expect(cars.addCar("0xff0000", 4))
      .to.___(___, "___")
      .withArgs(___, owner.___);
      
    // Second car should have ID 2
    await expect(cars.addCar("0x00ff00", 2))
      .to.emit(cars, "CarAdded")
      .withArgs(___, owner.address);
  });

  it("should emit CarRemoved event", async function () {
    // Add a car first
    await cars.addCar("0xff0000", 4);
    
    // Remove it and check event
    await expect(cars.___(__))
      .to.emit(___, "CarRemoved")
      .withArgs(1);
  });

  it("should emit multiple events correctly", async function () {
    const [owner] = await ethers.getSigners();
    
    // Add first car
    await expect(cars.addCar("0xff0000", 4))
      .to.emit(cars, "CarAdded")
      .withArgs(1, owner.address);
      
    // Add second car
    await expect(cars.addCar("0x00ff00", 2))
      .to.emit(cars, "CarAdded")
      .withArgs(___, ___);
      
    // Add third car
    await expect(cars.addCar("0x0000ff", 5))
      .to.emit(cars, "CarAdded")
      .withArgs(3, owner.address);
  });

});

