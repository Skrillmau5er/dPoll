import { ethers } from "hardhat";

async function main() {
  const PollManager = await ethers.getContractFactory("PollManager");
  const pollManager = await PollManager.deploy();
  await pollManager.deployed();

  console.log("Contracts deployed!\nAdd the addresses to backend/index.ts:");
  console.log(`POLL_MAANGER_ADDRESS: ${pollManager.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
