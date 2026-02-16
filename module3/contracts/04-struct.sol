// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

contract Cars {

    enum CarStatus { driving, parked }

    struct Car {
        bytes3 colour;
        uint8 doors;
        CarStatus status;
        address owner;
    }

Car public myCar;

    constructor() {
    }

}