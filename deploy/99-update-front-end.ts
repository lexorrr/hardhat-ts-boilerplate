import { ethers, getChainId, network } from "hardhat";
import * as fs from "fs";
import { networkConfig } from "../helper-hardhat-config";
const FRONT_END_ADDRESSES_FILE =
  "/Users/rrmendoza/development/web3/nextjs/blogr-nextjs-prisma/constants/contractAddresses.json";
const FRONT_END_ABI_FILE =
  "/Users/rrmendoza/development/web3/nextjs/blogr-nextjs-prisma/constants/abi.json";

const updateFrontend = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Update front end DONE!");
  }
};

const updateAbi = async () => {
  const sampleContract = await ethers.getContract("SampleContract");
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    sampleContract.interface.format(ethers.utils.FormatTypes.json).toString()
  );
};

const updateContractAddresses = async () => {
  const sampleContract = await ethers.getContract("SampleContract");
  const chainId = await getChainId();

  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(sampleContract.address)) {
      currentAddresses[chainId].push(sampleContract.address);
    }
  } else {
    currentAddresses[chainId] = [sampleContract.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
};

export default updateFrontend;
updateFrontend.tags = ["all", "frontend", "main"];
