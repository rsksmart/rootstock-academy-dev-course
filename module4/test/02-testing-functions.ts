import { ethers } from "hardhat";
import { expect } from "chai";

describe("02-testing-functions: Testing Contract Functions", function () {
  let cars: any;

  ___(async () => {
    const Cars = await ethers.getContractFactory("Cars");
    cars = await Cars.deploy();
    await cars.waitForDeployment();
  });

  it("should increment numCars when addCar is called", async function () {
    // Get initial value
    const initialNumCars = await cars.___();
    expect(initialNumCars).to.equal(0);
    
    // Call addCar function
    await cars.addCar("0xff0000", 4);
    
    // Get new value
    const newNumCars = await cars.numCars();
    expect(newNumCars).to.equal(___);
  });

  it("should store car data correctly", async function () {
    // Add a car
    const tx = await cars.addCar("0x00ff00", 2);
    await tx.___();
    
    // Read the car data
    const car = await cars.cars(1);
    
    // Verify car data
    expect(car[0]).to.equal("___");  // colour
    expect(car[1]).to.equal(___);     // doors
    expect(car[2]).to.equal(1);       // status (parked = 1)
  });

  it("should set owner to msg.sender", async function () {
    const [owner] = await ethers.___();
    
    // Add a car
    await cars.addCar("0xff0000", 4);
    
    // Read the car
    const car = await cars.cars(1);
    
    // Owner should be the signer address
    expect(car[3]).to.equal(owner.___);
  });

  it("should handle multiple cars", async function () {
    // Add multiple cars
    await cars.addCar("0xff0000", 4);
    await cars.addCar("0x00ff00", 2);
    await cars.addCar("0x0000ff", 5);
    
    // Check numCars
    const numCars = await cars.numCars();
    expect(numCars).to.equal(3);
    
    // Verify each car exists
    const car1 = await cars.cars(1);
    const car2 = await cars.cars(2);
    const car3 = await cars.cars(3);
    
    expect(car1[0]).to.equal("0xff0000");
    expect(car2[0]).to.equal("0x00ff00");
    expect(car3[0]).to.equal("0x0000ff");
  });

});

