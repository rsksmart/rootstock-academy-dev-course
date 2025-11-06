pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;

    constructor() {
    }

    function addCar(
        bytes3 colour,
        uint8 doors
    )
        public
        ___
        returns(uint256 carId)
    {
        ___(
            msg.___ > ___,
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
    }

    function statusChange(
        uint256 ___,
        CarStatus newStatus
    ) public {
        require(
            cars[carId].___ == msg.___,
            "only owner"
        );
        require(
            cars[carId].___ != ___,
            "no change"
        );
        cars[carId].status = newStatus;
    }

}
