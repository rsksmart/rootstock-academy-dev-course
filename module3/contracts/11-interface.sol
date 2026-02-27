// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ISuperHonk {
  function count() external view returns (uint256);

  function honk() external;
}

contract SuperHonk is ISuperHonk {
    uint256 public count;

    event LoudSound(address indexed source);

    function honk()
      public
    {
        count += 1;
        emit LoudSound(msg.sender);
    }
}

contract Cars {

    enum CarStatus { driving, parked }

    event CarHonk(uint256 indexed carId);

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
    }

    function statusChange(
        uint256 carId,
        CarStatus newStatus
    )
        public
        onlyOwner(carId)
    {
        require(
            cars[carId].status != newStatus,
            "no change"
        );
        cars[carId].status = newStatus;
    }

    function honk(
        uint256 carId
    )
        public
        onlyOwner(carId)
    {
        emit CarHonk(carId);
    }

    modifier onlyOwner(
        uint256 carId
    )
    {
        require(
            cars[carId].owner == msg.sender,
            "only owner"
        );
        _;
    }

}
