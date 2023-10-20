// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Solver.sol";

interface IMagicNumber {
    function setSolver(address solver) external;
}

contract Solver {
    IMagicNumber public solver;

    constructor(IMagicNumber target) {
        solver = target;
    }

    // For getting the Opcodes, first this has been tested on remix
    //assembly {
    //    mstore(0x00, 0x2A)
    //    return (0x00, 0x20)
    //}

    // INIT CODE
    // PUSH1 10 - 60 0A (Length of the runtime code)
    // PUSH1 12 - 60 0C (Position of the runtime code in transaction data)
    // PUSH1 00 - 60 00 (Destiny in memory)
    // CODECOPY - 39
    // With code in memory, return it
    // PUSH1 10 - 60 0A (Length of the runtime code)
    // PUSH1 00 - 60 00 (Memory location)
    // RETURN   - F3

    // RUNTIME CODE
    // PUSH1 2A  -> 60 2A
    // PUSH1 00  -> 60 00
    // MSTORE    -> 52
    // PUSH1 20  -> 60 20
    // PUSH1 00  -> 60 00
    // RETURN    -> F3
    
    // -- Initialization code -- --- Runtime code ---
    // 600A600C600039600A6000F3 | 602A60005260206000F3 |
    
    function createTinySolver() external {
        address addr;
        bytes memory initCode = hex"600A600C600039600A6000F3";
        bytes memory runtimeCode = hex"602A60005260206000F3";
        bytes memory bytecode = abi.encodePacked(initCode, runtimeCode);
        assembly {
            addr:= create(0, add(bytecode, 0x20), mload(bytecode))
        }
        solver.setSolver(addr);
    }
}