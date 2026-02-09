// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ISuperHonk {
    function superHonk() external;
}

contract Abc {

    enum CarStatus { Driving, Parked }

    struct Car {
        bool isBlack;
        uint doors;
        address owner;
        CarStatus status;
    }

    mapping(uint => Car) public cars;
    uint public numCars;

    event LoudSound(uint indexed carId);

    ISuperHonk private superHonk;

    constructor(address _superHonk) {
        superHonk = ISuperHonk(_superHonk);
    }

    modifier onlyOwner(uint carId) {
        require(cars[carId].owner == msg.sender, "Only owner can call");
        _;
    }

    function addCar(bool _isBlack, uint _doors) public payable returns (uint carId) {
        require(msg.value >= 0.1 ether, "Minimum 0.1 ETH required");

        numCars += 1;
        carId = numCars;

        Car memory newCar = Car({
            isBlack: _isBlack,
            doors: _doors,
            owner: msg.sender,
            status: CarStatus.Parked
        });

        cars[carId] = newCar;
    }

    function statusChange(uint carId, CarStatus newStatus) public onlyOwner(carId) {
        require(cars[carId].status != newStatus, "New status must differ");
        cars[carId].status = newStatus;
    }

    function honk(uint carId) public onlyOwner(carId) {
        emit LoudSound(carId);
    }
}
