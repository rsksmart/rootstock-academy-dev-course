// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    // When moving variables into struct 
    // Remove all visibility modifiers inside struct
    // Apply visibility to struct variable instead like below
    Car public myCar;
    // Solidity auto-generates getter for public struct
    constructor() {
    }

}
