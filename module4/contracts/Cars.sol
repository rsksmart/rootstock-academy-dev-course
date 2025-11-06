// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    event CarAdded(uint256 indexed carId, address indexed owner);
    event CarRemoved(uint256 indexed carId);

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    address public owner;
    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;

    constructor() {
        owner = msg.sender;
    }

    function addCar(
        bytes3 colour,
        uint8 doors
    )
        public
        returns(uint256 carId)
    {
        carId = ++numCars;
        Car memory newCar = Car(
            colour,
            doors,
            CarStatus.parked,
            msg.sender
        );
        cars[carId] = newCar;
        emit CarAdded(carId, msg.sender);
    }

    function removeCar(uint256 carId) public {
        require(carId <= numCars, "Car does not exist");
        require(cars[carId].owner == msg.sender, "Not owner");
        
        delete cars[carId];
        emit CarRemoved(carId);
    }

}

