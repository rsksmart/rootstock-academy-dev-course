import { ethers } from "hardhat";
import { expect } from "chai";

describe("04-testing-reverts: Testing Error Handling", function () {
  let cars: any;
  let owner: any;
  let otherUser: any;

  beforeEach(async () => {
    const Cars = await ethers.getContractFactory("Cars");
    cars = await Cars.deploy();
    await cars.waitForDeployment();
    
    [owner, otherUser] = await ethers.getSigners();
  });

  it("should revert when non-owner tries to remove car", async function () {
    // Add a car as owner
    await cars.addCar("0xff0000", 4);
    
    // Try to remove as other user - should revert
    await expect(
      cars.connect(otherUser).removeCar(1)
      // This is Not Owner
    ).to.be.revertedWith("Not owner");
  });

  it("should revert when removing non-existent car", async function () {
    // Try to remove car that doesn't exist
    await expect(
      cars.removeCar(999)
      // This is Car does not exist
    ).to.be.revertedWith("Car does not exist");
  });

  it("should NOT revert when owner removes their own car", async function () {
    // Add a car
    await cars.addCar("0xff0000", 4);
    
    // Owner should be able to remove it
    await expect(cars.removeCar(1)).to.not.be.reverted;
  });

  it("should revert with correct error messages", async function () {
    // Add a car as owner
    await cars.addCar("0xff0000", 4);
    
    // Test specific error message
    await expect(
      cars.connect(otherUser).removeCar(1)
    ).to.be.revertedWith("Not owner");
    
    // Test another error message
    await expect(
      cars.removeCar(999)
    ).to.be.revertedWith("Car does not exist");
  });

  it("should handle multiple reverts correctly", async function () {
    // Add two cars
    await cars.addCar("0xff0000", 4);
    await cars.addCar("0x00ff00", 2);
    
    // Other user can't remove first car
    await expect(
      cars.connect(otherUser).removeCar(1)
    ).to.be.revertedWith("Not owner");
    
    // Other user can't remove second car either
    await expect(
      cars.connect(otherUser).removeCar(2)
    ).to.be.revertedWith("Not owner");
  });

});

