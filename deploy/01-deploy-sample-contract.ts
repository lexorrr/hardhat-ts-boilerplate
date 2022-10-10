import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

const deploySampleContract = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("--------------------------");
  const args: string[] = ["Hello World!"];
  const basicNft = await deploy("SampleContract", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(basicNft.address, args);
  }
};

export default deploySampleContract;
deploySampleContract.tags = ["all", "samplecontract", "main"]