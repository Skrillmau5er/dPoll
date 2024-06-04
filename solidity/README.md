# Solidity Contracts: dPoll

This folder contains the two contacts `Poll` and `PollManager` along with a series of tests for them, and a script to help deploy them through the ethereum network.

## Contracts

- Poll: This contains the contract for a single poll, and all its relevant fields. It also includes mapping of who has voted on the polls, and all the information about the poll. [poll.sol](./contracts/poll.sol)
- Poll Manager: Stores a list of all the polls. Inherits the responsibility of creating and fetching polls.[poll_manager.sol](./contracts/poll_manager.sol)

## Installation and Usage

### Install dependencies:

```bash
npm install
```

### Compile Smart Contracts:

```bash
npm run compile
```

### Test Smart Contracts:

```bash
npm run test
```

### Deploy Smart Contracts to FireFly:

```bash
npx hardhat run scripts/deploy.ts --network firefly
```
