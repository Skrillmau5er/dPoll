import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("poll", function () {
  async function deployPoll() {
    const Poll = await ethers.getContractFactory("Poll");
    const poll = await Poll.deploy();

    return { poll };
  }

  describe("create poll", function () {
    it("should create poll with id of 5", async function () {
      const { poll } = await loadFixture(deployPoll);

      await poll.createPoll(5);
      const res = await poll.getPolls()
      expect(res[0]).to.equal(5);
    });
    // it("Should set the value to 20", async function () {
    //   const { simple_storage } = await loadFixture(deploySimpleStorage);

    //   await simple_storage.set(20);
    //   expect(await simple_storage.get()).to.equal(20);
    // });
  });
});
