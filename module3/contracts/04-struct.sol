pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint256 doors;
        CarStatus status;
        address owner;
    }
    // variables lose their individual visibility modifiers when moved

    constructor() {
    }

}
