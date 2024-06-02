// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

import './poll.sol';

contract PollManager {
    Poll[] public polls;

    event PollCreated(address pollAddress, address sender);
    event VoteCast(string option, address voter);

    error PollNotFound(address pollAddress);

    struct PollData {
        string title;
        string[] options;
        uint[] votes;
        address pollAddress;
    }

    function createPoll(string memory title, string[] memory options, address creator) public {
        Poll newPoll = new Poll(title, options, creator);
        polls.push(newPoll);
        emit PollCreated(address(newPoll), msg.sender);
    }

    function getPoll(address pollAddress) public view returns (PollData memory) {
        for (uint i = 0; i < polls.length; i++) {
            if (address(polls[i]) == pollAddress) {
                return getPollData(polls[i]);
            }
        }
        revert PollNotFound(pollAddress);
    }

    function voteOnPoll(address pollAddress, string memory option, address voter) public {
        for (uint i = 0; i < polls.length; i++) {
            if (address(polls[i]) == pollAddress) {
                polls[i].vote(option, voter);
                emit VoteCast(option, voter);
                return;
            }
        }
        revert PollNotFound(pollAddress);
    }

    // Consider adding pagination...
    function getPolls() public view returns (PollData[] memory) {
        PollData[] memory pollsData = new PollData[](polls.length);

        for (uint i = 0; i < polls.length; i++) {
            pollsData[i] = getPollData(polls[i]);
        }
        return pollsData;
    }

    function getPollData(Poll poll) private view returns (PollData memory) {
        PollData memory pollData;
        string[] memory options = poll.getPollOptions();

        pollData.title = poll.getPollTitle();
        pollData.options = options;
        pollData.pollAddress = address(poll);
        pollData.votes = new uint[](options.length);

        for (uint i = 0; i < options.length; i++) {
            pollData.votes[i] = poll.getVotesForOption(options[i]);
        }

        return pollData;
    }
}
