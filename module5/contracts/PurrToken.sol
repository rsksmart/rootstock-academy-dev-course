// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract PurrToken is ERC20 {
    constructor(uint256 initialSupply) ERC20('Purr token', 'PUR') {
        _mint(msg.sender, initialSupply);
    }

    fallback() external {
        revert('Unknown function call');
    }
}
