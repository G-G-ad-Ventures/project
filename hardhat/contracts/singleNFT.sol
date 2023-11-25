// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SingleNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor(string memory _nftName, string memory _symbol) 
        ERC721(_nftName, _symbol) 
        Ownable(msg.sender) {}
    function mint(address to) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _mint(to, tokenId);
        return tokenId;
    }

    function approve(address to, uint256 tokenId) public override {
        _approve(to, tokenId, super._msgSender());
    }
}
