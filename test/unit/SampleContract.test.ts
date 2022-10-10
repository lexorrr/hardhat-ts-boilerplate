import { assert } from "chai";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { SampleContract } from "../../typechain-types";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("SampleContract", () => {
      let sampleContract: SampleContract;

      beforeEach(async () => {
        const { deployer } = await getNamedAccounts();
        await deployments.fixture("all");
        sampleContract = await ethers.getContract("SampleContract", deployer);
      });

      describe("constructor", () => {
        it("message should be equal to 'Hello World!'", async () => {
          const message = await sampleContract.getMessage();
          assert.equal(message, "Hello World!");
        });
      });

      describe("setMessage", () => {
        it("message should be set to 'Hi!'", async () => {
          const [owner] = await ethers.getSigners();
          const messageInput = "Hi!";
          await sampleContract.connect(owner).setMessage(messageInput);
          const message = await sampleContract.getMessage();
          assert.equal(message, messageInput);
        });
      });
    });
