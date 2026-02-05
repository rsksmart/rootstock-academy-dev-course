pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        byte3 colour;
        uint256 doors;
        carStatus status;
        address owner;
    }
    // variables lose their individual visibility modifiers when moved

    constructor() {
    }

}
