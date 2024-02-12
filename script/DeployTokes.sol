// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {Script} from "forge-std/Script.sol";

import {ERC20Token} from "src/ERC20Token.sol";
import {ERC721Token} from "src/ERC721Token.sol";

/**
    forge script script/DeployTokes.sol \
        --broadcast \
        --rpc-url http://127.0.0.1:8545
*/
contract DeployTokes is Script {
    function run() public returns (ERC20Token erc20, ERC721Token erc721) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);

        vm.startBroadcast(pk);

        erc721 = new ERC721Token();
        erc721.mint(deployer);
        erc20 = new ERC20Token(address(erc721));

        vm.stopBroadcast();
    }
}
