// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SingleNFT is ERC721, Ownable {
    constructor(string memory nftName, string memory nftId) 
        ERC721(nftName, nftId) 
        Ownable(msg.sender) {}
    function mint(address to, uint256 tokenId) public onlyOwner {
        super._mint(to, tokenId);
    }
}
