// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus {
        driving,
        parked
    }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    Car public car;

    constructor() {
        // Initialize default values in the struct
        car = Car({
            colour: 0x000000,
            doors: 4,
            status: CarStatus.parked,
            owner: msg.sender
        });
    }
}