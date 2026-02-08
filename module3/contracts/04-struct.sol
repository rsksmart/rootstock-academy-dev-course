pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        address owner;
        CarStatus status;
    }

    constructor() {
    }

}
