// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISuperHonk {
    function honk() external;
}

contract SuperHonk is ISuperHonk {
    uint256 public count = 0;
    
    function honk() external override {
        count += 1;
    }
}