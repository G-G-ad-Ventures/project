// scripts/deploy.js
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying SingleNFT...');
  // const SingleNFT = await ethers.getContractFactory('SingleNFT');
  // const singleNFT = await SingleNFT.deploy("KOLUR", "DOG");
  // await singleNFT.deployed();
  const nft = await ethers.deployContract("SingleNFT", ["KOLUr", "DOG"]);
  await nft.waitForDeployment();
  // Mint a test token
  const tokenId = 1337; // Adjust the token ID as needed
  console.log(`Minting test token with ID ${tokenId}...`);
  await nft.mint(deployer.address, tokenId);

  console.log('Test token minted.');
  
  console.log('Deploying Auction...');
  const auction = await ethers.deployContract('EnglishAuction', [nft.target, tokenId, 1000]);
  await auction.waitForDeployment();

  console.log("Get auction contract approved to transfer NFT");

  await nft.approve(auction.target, tokenId);

  console.log("ready to take bids");
  console.log('Contracts deployed:');
  console.log('ERC721:', nft.target);
  console.log('Auction:', auction.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
