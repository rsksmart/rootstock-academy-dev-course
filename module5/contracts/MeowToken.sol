// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import 'erc-payable-token/contracts/token/ERC1363/ERC1363.sol';

contract MeowToken is ERC1363 {
    constructor(uint256 initialSupply) ERC20('Meow token', 'MEO') {
        _mint(msg.sender, initialSupply);
    }

    fallback() external {
        revert('Unknown function call');
    }
}
