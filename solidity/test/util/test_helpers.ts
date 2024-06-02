import { ethers } from "hardhat";

export const getRandomAddress = async () => {
  const accounts = await ethers.getSigners();
  return accounts[Math.floor(Math.random() * accounts.length)].address;
};
