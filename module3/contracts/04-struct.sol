// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus {
        driving,
        parked
    }

    bytes3 public colour;
    uint8 public doors;
    CarStatus public status;
    address public owner;

    constructor() {
        // Initialize default values
        colour = 0x000000;
        doors = 4;
        status = CarStatus.parked;
        owner = msg.sender;
    }
}