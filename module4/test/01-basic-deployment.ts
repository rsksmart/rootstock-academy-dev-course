import { ethers } from "hardhat";
import { expect } from "chai";

describe("01-basic-deployment: Testing Contract Deployment", function () {
  
  it("should deploy the Cars contract successfully", async function () {
    // Get contract factory
    const Cars = await ethers.___("Cars");
    
    // Deploy the contract
    const cars = await Cars.___();
    await cars.___();
    
    // Verify the contract address exists
    const address = await cars.___();
    ___(address).to.be.a("___");
    ___(address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("should initialize numCars to 0", async function () {
    const Cars = await ethers.___("Cars");
    const cars = await Cars.___;
    await cars.___();
    
    // Read the numCars state variable
    const numCars = await cars.___();
    
    // Verify it's initialized to 0
    ___(numCars).to.equal(___);
  });

  it("should have a public numCars variable", async function () {
    const Cars = await ethers.___("Cars");
    const cars = await Cars.___;
    await cars.___();
    
    // Verify numCars is a function (public getter)
    ___(cars.numCars).to.be.a("___");
  });

  it("should have an addCar function", async function () {
    const Cars = await ethers.___("Cars");
    const cars = await Cars.___;
    await cars.___();
    
    // Verify addCar function exists
    ___(cars.addCar).to.be.a("function");
  });

});

