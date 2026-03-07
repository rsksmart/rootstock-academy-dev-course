// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { parked, driving }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

    // making the struct public will make all of its fields public
    Car public car;

    constructor() {
        car = Car(0xff0000, 4, CarStatus.parked, msg.sender);
    }

}
