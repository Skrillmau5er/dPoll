import { ethers } from "hardhat";

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();

  const PollManager = await ethers.getContractFactory("PollManager");
  const pollManager = await PollManager.deploy();
  await pollManager.deployed();

  console.log("Contracts deployed!\nAdd the addresses to backend/index.ts:");
  console.log(`SIMPLE_STORAGE_ADDRESS: ${simpleStorage.address}`);
  console.log(`POLL_MAANGER_ADDRESS: ${pollManager.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
