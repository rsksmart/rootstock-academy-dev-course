// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the SuperHonk contract
interface ISuperHonk {
    function honk() external;
}

contract Cars {
    enum CarStatus { 
        driving, 
        parked 
    }

    event CarHonk(uint256 indexed carId);
    event CarAdded(uint256 indexed carId, address owner);
    event StatusChanged(uint256 indexed carId, CarStatus newStatus);
    event FundsWithdrawn(address receiver, uint256 amount);

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    ISuperHonk private superHonk;
    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;
    
    // Track contract balance
    uint256 public contractBalance;
    
    // Owner of the contract for withdrawal purposes
    address public contractOwner;

    constructor(address superHonkAddress) {
        superHonk = ISuperHonk(superHonkAddress);
        contractOwner = msg.sender;
    }

    function addCar(bytes3 colour, uint8 doors) 
        public 
        payable 
        returns(uint256 carId) 
    {
        require(msg.value >= 0.1 ether, "requires minimum 0.1 ether payment");
        require(doors > 0 && doors <= 6, "doors must be between 1 and 6");
        
        carId = ++numCars;
        cars[carId] = Car(colour, doors, CarStatus.parked, msg.sender);
        contractBalance += msg.value;
        
        emit CarAdded(carId, msg.sender);
        return carId;
    }

    function statusChange(uint256 carId, CarStatus newStatus) 
        public 
        onlyOwner(carId) 
        validCarId(carId)
    {
        require(cars[carId].status != newStatus, "status unchanged");
        cars[carId].status = newStatus;
        
        emit StatusChanged(carId, newStatus);
    }

    function honk(uint256 carId, bool isLoud) 
        public 
        onlyOwner(carId)
        validCarId(carId)
    {
        emit CarHonk(carId);
        if (isLoud && address(superHonk) != address(0)) {
            superHonk.honk();
        }
    }

    // Function to get car details
    function getCar(uint256 carId) 
        public 
        view 
        validCarId(carId)
        returns(bytes3 colour, uint8 doors, CarStatus status, address owner) 
    {
        Car memory car = cars[carId];
        return (car.colour, car.doors, car.status, car.owner);
    }

    // Transfer car ownership
    function transferOwnership(uint256 carId, address newOwner) 
        public 
        onlyOwner(carId)
        validCarId(carId)
    {
        require(newOwner != address(0), "invalid address");
        cars[carId].owner = newOwner;
    }

    // Withdraw contract funds (only contract owner)
    function withdrawFunds(uint256 amount) public {
        require(msg.sender == contractOwner, "only contract owner");
        require(amount <= contractBalance, "insufficient contract balance");
        require(amount > 0, "amount must be > 0");
        
        contractBalance -= amount;
        payable(contractOwner).transfer(amount);
        
        emit FundsWithdrawn(contractOwner, amount);
    }

    // Update SuperHonk address
    function updateSuperHonk(address newSuperHonkAddress) public {
        require(msg.sender == contractOwner, "only contract owner");
        superHonk = ISuperHonk(newSuperHonkAddress);
    }

    // Receive function to accept ether
    receive() external payable {
        contractBalance += msg.value;
    }

    // Fallback function
    fallback() external payable {
        contractBalance += msg.value;
    }

    // Modifiers
    modifier onlyOwner(uint256 carId) {
        require(cars[carId].owner == msg.sender, "only car owner can perform this action");
        _;
    }
    
    modifier validCarId(uint256 carId) {
        require(carId > 0 && carId <= numCars, "invalid car ID");
        _;
    }
}

// Optional: Example SuperHonk implementation
contract SuperHonk is ISuperHonk {
    event SuperHonkEvent(address indexed caller, uint256 timestamp);
    
    function honk() external override {
        emit SuperHonkEvent(msg.sender, block.timestamp);
    }
    
    // Additional function to demonstrate interface compatibility
    function extraFunction() public pure returns (string memory) {
        return "This is an extra function in SuperHonk";
    }
}