// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISuperHonk {
    function honk() external;
}

contract SuperHonk is ISuperHonk {
    event HonkCalled(address indexed caller);
    
    function honk() external override {
        emit HonkCalled(msg.sender);
    }
}