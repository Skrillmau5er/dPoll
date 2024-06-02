// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Poll {
    string public title;
    string[] public options;
    address public creator;
    mapping(string => uint) public votes;
    mapping(address => bool) public hasVoted;
    mapping(string => bool) public validOptions;

    error OptionsAreNotUnique(string[] options, string title);

    constructor(string memory _title, string[] memory _options, address _creator) {
        title = _title;
        options = _options;
        creator = _creator;

        for(uint i = 0; i < options.length; i++) {
            if(validOptions[options[i]] == true) {
                revert OptionsAreNotUnique(options, title);
            }
            validOptions[options[i]] = true;
        }
    }

    function vote(string memory option, address voter) public {
        require(validOptions[option], "Invalid option");
        require(!hasVoted[voter], "Already voted");

        votes[option]++;
        hasVoted[voter] = true;
    }

    function getPollTitle() public view returns (string memory) {
        return title;
    }

    function getPollOptions() public view returns (string[] memory) {
        return options;
    }

    function getVotesForOption(string memory option) public view returns (uint) {
        require(validOptions[option], "Invalid option");
        return votes[option];
    }
}
