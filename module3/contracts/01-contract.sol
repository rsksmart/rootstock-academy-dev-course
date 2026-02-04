// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Abc {
    uint256 public sum;

    constructor() {
        sum = 0;
    }

    function add(uint256 a, uint256 b) public {
        sum = a + b;
    }
}