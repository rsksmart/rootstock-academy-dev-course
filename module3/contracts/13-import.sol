// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statement - specific import from relative path
import {ISuperHonk} from "./13-import-target.sol";

contract Cars {
    enum CarStatus { 
        driving, 
        parked 
    }

    event CarHonk(uint256 indexed carId);
    event CarAdded(uint256 indexed carId, address owner, bytes3 colour, uint8 doors);
    event StatusChanged(uint256 indexed carId, CarStatus newStatus);

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    // Using the imported ISuperHonk type
    ISuperHonk public superHonk;
    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;

    constructor(address _superHonkAddress) {
        // Initialize with imported interface type
        superHonk = ISuperHonk(_superHonkAddress);
    }

    function addCar(
        bytes3 colour,
        uint8 doors
    )
        public
        payable
        returns(uint256 carId)
    {
        require(
            msg.value > 0.1 ether,
            "requires payment"
        );
        carId = ++numCars;
        Car memory newCar = Car(
            colour,
            doors,
            CarStatus.parked,
            msg.sender
        );
        cars[carId] = newCar;
        
        emit CarAdded(carId, msg.sender, colour, doors);
        return carId;
    }

    function statusChange(
        uint256 carId,
        CarStatus newStatus
    )
        public
        onlyOwner(carId)
        carExists(carId)
    {
        require(
            cars[carId].status != newStatus,
            "no change"
        );
        cars[carId].status = newStatus;
        
        emit StatusChanged(carId, newStatus);
    }

    function honk(
        uint256 carId,
        bool isLoud
    )
        public
        onlyOwner(carId)
        carExists(carId)
    {
        emit CarHonk(carId);
        
        // Using the imported interface
        if (isLoud && address(superHonk) != address(0)) {
            superHonk.honk();  // Call through imported interface
        }
    }

    function updateSuperHonk(address newSuperHonkAddress) public {
        require(msg.sender == cars[1].owner, "only first car owner");
        superHonk = ISuperHonk(newSuperHonkAddress);
    }

    // Get car details
    function getCar(uint256 carId) 
        public 
        view 
        carExists(carId)
        returns(bytes3 colour, uint8 doors, CarStatus status, address owner) 
    {
        Car memory car = cars[carId];
        return (car.colour, car.doors, car.status, car.owner);
    }

    // Modifiers
    modifier onlyOwner(uint256 carId) {
        require(
            cars[carId].owner == msg.sender,
            "only owner"
        );
        _;
    }
    
    modifier carExists(uint256 carId) {
        require(carId > 0 && carId <= numCars, "car does not exist");
        _;
    }
    
    // Function to demonstrate interface usage
    function testInterface() public view returns (bool) {
        return address(superHonk) != address(0);
    }
}