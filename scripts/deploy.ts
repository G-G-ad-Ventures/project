// scripts/deploy.js
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying SingleNFT...');
  const SingleNFT = await ethers.getContractFactory('SingleNFT');
  const singleNFT = await SingleNFT.deploy("KOLUR", "DOG");
  await singleNFT.deployed();

  // Mint a test token
  const tokenId = 1337; // Adjust the token ID as needed
  console.log(`Minting test token with ID ${tokenId}...`);
  await singleNFT.mint(deployer.address, tokenId);

  console.log('Test token minted.');


  // console.log('Deploying Auction...');
  // const Auction = await ethers.getContractFactory('EnglishAuction');
  // const startingBid = 100; // Adjust the starting bid value as needed
  // const auction = await Auction.deploy(SingleNFT.address, 1, startingBid); // Assuming 1 is the NFT ID
  // await auction.deployed();

  // console.log('Contracts deployed:');
  // console.log('ERC721:', erc721.address);
  // console.log('Auction:', auction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
