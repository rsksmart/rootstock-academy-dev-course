import { ethers, network } from "hardhat";
import { expect } from "chai";

describe("05-advanced-testing: Advanced Testing Techniques", function () {
  let carLock: any;

  beforeEach(async () => {
    const CarLock = await ethers.getContractFactory("CarLock");
    carLock = await CarLock.deploy();
    await carLock.waitForDeployment();
  });

  it("should not allow unlock before time", async function () {
    // Lock a car
    await carLock.lockCar();
    
    // Try to unlock immediately - should fail
    await expect(
      carLock.unlockCar(1)
    ).to.be.revertedWith("Too early");
  });

  it("should allow unlock after time passes", async function () {
    // Lock a car
    await carLock.lockCar();
    
    // Advance time by 1 hour (3600 seconds)
    await network.provider.send("evm_increaseTime", [3600]);
    await network.provider.send("evm_mine");
    
    // Now unlock should work
    await expect(carLock.unlockCar(1)).to.not.be.reverted;
  });

  it("should use snapshot and revert", async function () {
    // Lock a car
    await carLock.lockCar();
    
    // Take a snapshot of blockchain state
    const snapshotId = await network.provider.send("evm_snapshot");
    
    // Advance time
    await network.provider.send("evm_increaseTime", [3600]);
    await network.provider.send("evm_mine");
    
    // Should be able to unlock now
    await expect(carLock.unlockCar(1)).to.not.be.reverted;
    
    // Revert to snapshot
    await network.provider.send("evm_revert", [snapshotId]);
    
    // Now we're back in time, unlock should fail
    await expect(
      carLock.unlockCar(1)
    ).to.be.revertedWith("Too early");
  });

  it("should correctly calculate time until unlock", async function () {
    // Lock a car
    await carLock.lockCar();
    
    // Check initial time remaining (should be 3600 seconds)
    const timeRemaining = await carLock.getTimeUntilUnlock(1);
    expect(timeRemaining).to.be.closeTo(3600, 5); // Allow small variance
    
    // Advance time by half an hour
    await network.provider.send("evm_increaseTime", [1800]);
    await network.provider.send("evm_mine");
    
    // Check time remaining again (should be ~1800 seconds)
    const newTimeRemaining = await carLock.getTimeUntilUnlock(1);
    expect(newTimeRemaining).to.be.closeTo(1800, 10);
  });

  it("should handle multiple time manipulations", async function () {
    // Lock a car
    await carLock.lockCar();
    
    // Advance time in small increments
    await network.provider.send("evm_increaseTime", [1800]);
    await network.provider.send("evm_mine");
    
    // Still too early
    await expect(carLock.unlockCar(1)).to.be.revertedWith("Too early");
    
    // Advance more time
    await network.provider.send("evm_increaseTime", [1800]);
    await network.provider.send("evm_mine");
    
    // Now should work
    await expect(carLock.unlockCar(1)).to.not.be.reverted;
  });

  it("should manipulate balances for testing", async function () {
    // Create a random wallet
    const testAccount = ethers.Wallet.createRandom();
    
    // Set balance to 10 ETH (with hardhat)
    await network.provider.send("hardhat_setBalance", [
      testAccount.address,
      "0x8AC7230489E80000", // 10 ETH in hex
    ]);
    
    // Check the balance
    const balance = await ethers.provider.getBalance(testAccount.address);
    expect(balance).to.equal(ethers.parseEther("10"));
  });

});

