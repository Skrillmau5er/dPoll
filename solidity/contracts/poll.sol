// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

// Declares a new contract
contract Poll {
    struct Voter {
        bool hasVoted;
    }

     mapping(address => Voter) voters;

    int32[] public polls;

    function createPoll(int32 pollId) public {
        polls.push(pollId);
    }

    function vote() public {
        voters[msg.sender].hasVoted = true;
    }

    // Returns the currently stored unsigned integer
    function getPolls() public view returns (int32[] memory x) {
        return (polls);
    }
}

    // Allows the unsigned integer stored to be changed
    // function set(uint256 x) public {
    //     _x = x;
    //     emit Changed(msg.sender, _x);
    // }



    // event Changed(address indexed from, uint256 x);
