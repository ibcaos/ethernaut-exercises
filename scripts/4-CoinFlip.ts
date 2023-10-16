import { deployments, ethers } from "hardhat";
import { Deployment } from "hardhat-deploy/types";
import { AttackCoinFlip } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const attackCoinFlipDeployment: Deployment = await deployments.get("AttackCoinFlip");
  const attackCoinFlip : AttackCoinFlip = await ethers.getContractAt("AttackCoinFlip", attackCoinFlipDeployment.address);

  for(let i = 0; i < 10; i++){
    console.log(`🪙 Flip number ${i + 1}`);
    let tx = await attackCoinFlip.flip({gasLimit: 250000});
    let status = (await tx.wait()).status === 1;
    console.log(`Coin flip operation: ${status ? '✅' : '❌'}`);
    await delay(3000);
  }
};

main().catch(error => {
  console.error('🚫', error);
});
