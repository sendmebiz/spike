// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {ERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ERC721Token is ERC721, Ownable {
    uint256 public idCounter = 1;

    constructor() ERC721("KYC", "ERC721") Ownable(msg.sender) {}

    function mint(address to) external onlyOwner {
        _mint(to, idCounter);
        unchecked { idCounter++; }
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
}
