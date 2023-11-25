// scripts/deploy.js
const { ethers } = require('hardhat');
const hre = require("hardhat");


/*
  ADD TO LAST STEP TO CALL .START() TO START AUCTION
*/
async function hreDeployer() {
  console.log("using the Hardhat runtime");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const nft = await hre.ethers.getContractFactory("SingleNFT");

  const contract = await nft.deploy("Gullihaha", "HAHA");
  await contract.waitForDeployment();
  // mint nft 5 times
  for(let i = 0; i < 5; i++) {
    const mintTx = await contract.connect(deployer).mint(deployer.address);
    const respone = await mintTx.wait();
    console.log("mint tx", mintTx)
    console.log("wait res", respone)
  }

  const auction = await hre.ethers.getContractFactory("EnglishAuction");
  // auction off one of the 5 nfts minted picking randomly nft id = 2
  // at starting bid 100
  const auctionContract = await auction.deploy(deployer, 2, 100);
  await auctionContract.waitForDeployment();

  console.log("auciton contract address: ", auctionContract.target);
  console.log("Get auction contracct approved to transfer nft");
  await contract.approve(deployer, 2);

  console.log("ready to take bids");
  // console.log('Contracts deployed:');
  // console.log('ERC721:', nft.target);
  // console.log('Auction:', auction.target);
}

hreDeployer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
