import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config } from 'dotenv';
config();

const secretkey = process.env.ADDRESS_SECRET ?? ""
const etherscanApiKey =  process.env.ETHERSCAN_API_KEY ?? ""
const drpcApiKey = process.env.DRPC_KEY ?? ""
const hardhatConfig: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: etherscanApiKey
  },
  networks: {
    sepolia: {
      url: `https://lb.drpc.org/ogrpc?network=sepolia&dkey=${drpcApiKey}`,
      accounts: [secretkey]
    }
  }
};

export default hardhatConfig;
