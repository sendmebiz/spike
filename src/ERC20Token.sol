// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract ERC20Token is ERC20 {
    IERC721 public immutable ERC_721;

    error TransferDenied();

    constructor(address _erc721) ERC20("ERC20Token", "ERC20") {
        ERC_721 = IERC721(_erc721);
        _mint(msg.sender, 1_000_000_000 * 1e18);
    }

    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0)) {
            uint256 erc721Balance = IERC721(ERC_721).balanceOf(from);
            if (erc721Balance == 0) revert TransferDenied();
        }

        super._update(from, to, value);
    }
}
