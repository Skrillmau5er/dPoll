import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getRandomAddress } from "./util/test_helpers";

describe("poll", function () {
  async function deployPoll(
    creatorAddress: string,
    title = "title",
    options = ["option 1", "option 2"]
  ) {
    const Poll = await ethers.getContractFactory("Poll");
    const poll = await Poll.deploy(title, options, creatorAddress);

    return { poll };
  }

  it("should create poll with attributes", async function () {
    const randomAccount = await getRandomAddress();
    const fixture = () => deployPoll(randomAccount);
    const { poll } = await loadFixture(fixture);

    const title = await poll.getPollTitle();
    const options = await poll.getPollOptions();
    const votesForOption = await poll.getVotesForOption("option 1");

    expect(title).to.equal("title");
    expect(options[0]).to.equal("option 1");
    expect(options[1]).to.equal("option 2");
    expect(votesForOption).to.equal(0);
  });

  it("should change votes for options", async function () {
    const randomAccount = await getRandomAddress();
    const fixture = () => deployPoll(randomAccount);
    const { poll } = await loadFixture(fixture);

    let votesForOption = await poll.getVotesForOption("option 1");
    expect(votesForOption).to.equal(0);

    await poll.vote("option 1", randomAccount);
    votesForOption = await poll.getVotesForOption("option 1");

    expect(votesForOption).to.equal(1);
  });

  it("should not allow votes for non-existant options", async function () {
    const randomAccount = await getRandomAddress();
    const fixture = () => deployPoll(randomAccount);
    const { poll } = await loadFixture(fixture);

    await expect(poll.getVotesForOption("option 3")).to.be.revertedWith(
      "Invalid option"
    );
  });

  it("should not allow votes when user has already voted", async function () {
    const randomAccount = await getRandomAddress();
    const fixture = () => deployPoll(randomAccount);
    const { poll } = await loadFixture(fixture);

    await poll.vote("option 1", randomAccount);
    await expect(poll.vote("option 2", randomAccount)).to.be.revertedWith(
      "Already voted"
    );
    await expect(poll.vote("option 1", randomAccount)).to.be.revertedWith(
      "Already voted"
    );
  });

  it("should revert when options are not unique", async function () {
    const randomAccount = await getRandomAddress();
    const fixture = () =>
      deployPoll(randomAccount, "title", ["option 1", "option 2", "option 1"]);
    const Poll = await ethers.getContractFactory("Poll");

    await expect(loadFixture(fixture)).to.be.revertedWithCustomError(
      Poll,
      "OptionsAreNotUnique"
    );
  });
});
