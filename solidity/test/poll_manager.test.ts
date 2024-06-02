import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getRandomAddress } from "./util/test_helpers";

describe("poll manager", function () {
  async function deployPoll() {
    const PollManager = await ethers.getContractFactory("PollManager");
    const pollManager = await PollManager.deploy();

    return { pollManager };
  }

  it("should create poll with params", async function () {
    const randomAddress = await getRandomAddress();
    const { pollManager } = await loadFixture(deployPoll);
    await pollManager.createPoll(
      "Who is the best person?",
      ["Me", "Myself", "I"],
      randomAddress
    );
    let polls = await pollManager.getPolls();
    expect(polls.length).to.equal(1);

    await pollManager.createPoll(
      "What are sharks?",
      ["Fish", "Whale", "Shark"],
      randomAddress
    );

    polls = await pollManager.getPolls();
    expect(polls.length).to.equal(2);

    expect(polls[1].title).to.equal("What are sharks?");
    expect(polls[1].options[0]).to.equal("Fish");
    expect(polls[1].pollAddress.length).to.be.greaterThan(0);
    expect(polls[1].votes[2]).to.equal(0);

    const pollData = await pollManager.getPoll(polls[0].pollAddress);

    expect(pollData.title).to.equal("Who is the best person?");
    expect(pollData.options[1]).to.equal("Myself");
    expect(pollData.pollAddress.length).to.be.greaterThan(0);
    expect(pollData.votes[0]).to.equal(0);
  });

  it("should not error when searching for poll address that doesn't exist", async function () {
    const PollManager = await ethers.getContractFactory("PollManager");
    const randomAddress = await getRandomAddress();
    const { pollManager } = await loadFixture(deployPoll);

    await expect(
      pollManager.getPoll(randomAddress)
    ).to.be.revertedWithCustomError(PollManager, "PollNotFound");
  });

  it("should allow voting on poll", async function () {
    const creator = await getRandomAddress();
    const voter1 = await getRandomAddress();
    const voter2 = await getRandomAddress();
    const { pollManager } = await loadFixture(deployPoll);
    await pollManager.createPoll(
      "Who is the best person?",
      ["Me", "Myself", "I"],
      creator
    );

    let polls = await pollManager.getPolls();

    await pollManager.voteOnPoll(polls[0].pollAddress, "Me", voter1);
    let poll = await pollManager.getPoll(polls[0].pollAddress);

    expect(poll.votes[0]).to.equal(1);
    expect(poll.votes[1]).to.equal(0);
    expect(poll.votes[1]).to.equal(0);

    await pollManager.voteOnPoll(polls[0].pollAddress, "Me", voter2);
    poll = await pollManager.getPoll(polls[0].pollAddress);

    expect(poll.votes[0]).to.equal(2);
    expect(poll.votes[1]).to.equal(0);
    expect(poll.votes[1]).to.equal(0);

    await expect(
      pollManager.voteOnPoll(polls[0].pollAddress, "Me", voter1)
    ).to.be.revertedWith("Already voted");

    await expect(
      pollManager.voteOnPoll(polls[0].pollAddress, "Myself", voter2)
    ).to.be.revertedWith("Already voted");
  });

  it("should fail on voting for invalid options", async function () {
    const creator = await getRandomAddress();
    const voter1 = await getRandomAddress();
    const { pollManager } = await loadFixture(deployPoll);
    await pollManager.createPoll(
      "Who is the best person?",
      ["Me", "Myself", "I"],
      creator
    );

    let polls = await pollManager.getPolls();

    await expect(
      pollManager.voteOnPoll(polls[0].pollAddress, "Them", voter1)
    ).to.be.revertedWith("Invalid option");

    let poll = await pollManager.getPoll(polls[0].pollAddress);

    expect(poll.votes[0]).to.equal(0);
    expect(poll.votes[1]).to.equal(0);
    expect(poll.votes[1]).to.equal(0);

    await pollManager.voteOnPoll(polls[0].pollAddress, "Me", voter1);
    poll = await pollManager.getPoll(polls[0].pollAddress);

    expect(poll.votes[0]).to.equal(1);
  });
});
