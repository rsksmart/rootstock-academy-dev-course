// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Cars {

    enum CarStatus { driving, parked }

    bytes3 public colour;
    uint8 public doors;
    CarStatus public status;
    address public owner;

    constructor() {
        colour = 0xff0000;
        doors = 4;
        status = CarStatus.parked;
        owner = msg.sender;
    }

}
