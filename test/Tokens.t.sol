// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC721Errors} from "lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol";

import {DeployTokes} from "script/DeployTokes.sol";
import {ERC20Token} from "src/ERC20Token.sol";
import {ERC721Token} from "src/ERC721Token.sol";

// forge test -vvv
contract CounterTest is Test {
    ERC20Token internal _erc20;
    ERC721Token internal _erc721;

    address internal _user = makeAddr("User");
    address internal _deployer;

    event Transfer(address from, address to, uint256 tokenId);

    function setUp() public {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        _deployer = vm.addr(pk);

        DeployTokes deployTokes = new DeployTokes();
        (_erc20, _erc721) = deployTokes.run();

        vm.prank(_deployer);
        _erc721.mint(_deployer);
    }

    function test_only_owner_can_mint_burn() public {
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, address(this)));
        _erc721.mint(address(this));

        uint256 expectedTokenId = _erc721.idCounter();

        vm.prank(_deployer);
         _erc721.mint(address(this));

        address owner = _erc721.ownerOf(expectedTokenId);

        assertEq(owner, address(this), "Expect this contract is the owner of the token");

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, address(this)));
        _erc721.burn(expectedTokenId);

        vm.prank(_deployer);
        _erc721.burn(expectedTokenId);

        vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, expectedTokenId));
        _erc721.ownerOf(expectedTokenId);
    }

    function test_should_mint_erc721() public {
        uint256 expectedTokenId = _erc721.idCounter();

        uint256 balanceBefore = _erc721.balanceOf(_user);

        assertEq(balanceBefore, 0, "Expect have no tokens");

        vm.prank(_deployer);
        _erc721.mint(_user);

        uint256 balanceAfter = _erc721.balanceOf(_user);

        assertEq(balanceAfter, 1, "Expect have 1 token");

        address owner = _erc721.ownerOf(expectedTokenId);

        assertEq(owner, _user, "Expect user is the owner of the token");
    }

    function test_erc20_transfer_with_erc721_token() public {
        uint256 balanceBefore = _erc20.balanceOf(_user);

        assertEq(balanceBefore, 0, "Expect have no tokens");

        uint256 amountToTransfer = 100e18;

        vm.prank(_deployer);
        _erc20.transfer(_user, amountToTransfer);

        vm.expectRevert(ERC20Token.TransferDenied.selector);
        vm.prank(_user);
        _erc20.transfer(_deployer, amountToTransfer);

        vm.prank(_deployer);
        _erc721.mint(_user);

        vm.prank(_user);
        _erc20.transfer(_deployer, amountToTransfer / 2);

        uint256 balanceAfter = _erc20.balanceOf(_user);

        assertEq(balanceAfter, amountToTransfer / 2, "Expect have amountToTransfer / 2 tokens");
    }

    function test_should_fail_to_transfer_without_erc721() public {
        uint256 amountToTransfer = 100e18;
        uint256 expectedTokenId = _erc721.idCounter();

        vm.prank(_deployer);
        _erc721.mint(_user);

        vm.prank(_deployer);
        _erc20.transfer(_user, amountToTransfer);

        vm.prank(_user);
        _erc20.transfer(_deployer, amountToTransfer / 2);

        vm.prank(_deployer);
        _erc721.burn(expectedTokenId);

        vm.expectRevert(ERC20Token.TransferDenied.selector);
        vm.prank(_user);
        _erc20.transfer(_deployer, amountToTransfer / 2);
    }

    function test_transfer_limits() public {
        uint256 amountToTransfer = _erc20.TRANSFER_LIMIT();

        vm.prank(_deployer);
        _erc721.mint(_user);

        for (uint256 i = 0; i < 3; i++) {
            vm.prank(_deployer);
            _erc20.transfer(_user, amountToTransfer);

            vm.prank(_deployer);
            vm.expectRevert(ERC20Token.TransferLimitExceeded.selector);
            _erc20.transfer(_user, amountToTransfer);

            vm.warp(block.timestamp + 6 minutes);
        }

        uint256 balanceAfter = _erc20.balanceOf(_user);

        assertEq(balanceAfter, amountToTransfer * 3, "Expect have amountToTransfer * 3 tokens");
    }
}
