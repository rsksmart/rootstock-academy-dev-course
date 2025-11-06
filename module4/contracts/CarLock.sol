// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CarLock {
    
    struct LockedCar {
        address owner;
        uint256 unlockTime;
        bool exists;
    }
    
    mapping(uint256 => LockedCar) public lockedCars;
    uint256 public nextCarId = 1;
    uint256 public lockDuration = 3600; // 1 hour
    
    event CarLocked(uint256 indexed carId, address indexed owner, uint256 unlockTime);
    event CarUnlocked(uint256 indexed carId);
    
    function lockCar() public returns (uint256 carId) {
        carId = nextCarId++;
        lockedCars[carId] = LockedCar({
            owner: msg.sender,
            unlockTime: block.timestamp + lockDuration,
            exists: true
        });
        
        emit CarLocked(carId, msg.sender, lockedCars[carId].unlockTime);
    }
    
    function unlockCar(uint256 carId) public {
        require(lockedCars[carId].exists, "Car does not exist");
        require(lockedCars[carId].owner == msg.sender, "Not owner");
        require(block.timestamp >= lockedCars[carId].unlockTime, "Too early");
        
        delete lockedCars[carId];
        emit CarUnlocked(carId);
    }
    
    function getTimeUntilUnlock(uint256 carId) public view returns (uint256) {
        require(lockedCars[carId].exists, "Car does not exist");
        
        if (block.timestamp >= lockedCars[carId].unlockTime) {
            return 0;
        }
        
        return lockedCars[carId].unlockTime - block.timestamp;
    }
}

