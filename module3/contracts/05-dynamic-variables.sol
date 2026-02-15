pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    ___ public numCars = ___;
    unit256 public numCars = 0;
    ____(uint256 => ___) public cars;
    mapping (unit256 => Car) public cars;

    constructor() {
    }

}
