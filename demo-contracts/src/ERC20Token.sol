// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ERC20Token is ERC20, Ownable {
    uint256 public periodDuration;
    uint256 public transferLimit;
    bool public kycEnabled;
    address private _owner;
    IERC721 public immutable ERC_721;

    mapping(address sender => mapping(uint256 period => uint256 transferredAmount)) public transfers;

    error TransferDenied();
    error TransferLimitExceeded();

    constructor(address _erc721) ERC20("CB_USD", "ERC20") Ownable(msg.sender) {
        _owner = msg.sender;
        ERC_721 = IERC721(_erc721);
        periodDuration = 3 minutes;
        transferLimit = 100e18;
        kycEnabled = true;
        _mint(msg.sender, 1_000_000e18);
    }

    function getPolicyState() external view returns (uint256 period, uint256 limit, bool kyc) {
        return (periodDuration, transferLimit, kycEnabled);
    }

    function setPeriod(uint256 period) external onlyOwner {
        periodDuration = period;
    }

    function setLimit(uint256 limit) external onlyOwner {
        transferLimit = limit;
    }

    function setKyc(bool enabled) external onlyOwner {
        kycEnabled = enabled;
    }

    function mint(address to, uint256 value) external onlyOwner {
        _mint(to, value);
    }

    function burn(uint256 value) external onlyOwner {
       _burn(_owner, value);
    }

    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0) && from != _owner) {
            if(kycEnabled == true){
                uint256 fromErc721Balance = IERC721(ERC_721).balanceOf(from);
                uint256 toErc721Balance = IERC721(ERC_721).balanceOf(to);
                if (fromErc721Balance == 0 || toErc721Balance == 0) revert TransferDenied();
            }

            if (transferLimit != 0 ){
                uint256 currentPeriod;
                unchecked { currentPeriod = block.timestamp / periodDuration * periodDuration; }

                uint256 transferredAmount = transfers[from][currentPeriod];

                uint256 newTransferredAmount;
                unchecked { newTransferredAmount = transferredAmount + value; }

                if (newTransferredAmount > transferLimit) revert TransferLimitExceeded();

                transfers[from][currentPeriod] = newTransferredAmount;
            }
        }

        super._update(from, to, value);
    }
}
