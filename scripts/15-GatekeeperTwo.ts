import { ethers } from "hardhat";
import { GatekeeperTwo } from "../typechain-types";

const checkMissionStatus = async (
  gateKeeperTwo: GatekeeperTwo,
  deployerAddress: string
) => {
  const isMissionAccomplished =
    (await gateKeeperTwo.entrant()) === deployerAddress;
  console.log(`🎯 Mission Accomplished: ${isMissionAccomplished ? '✅ Yes!' : '❌ No!'}`);
};

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();
  const gateKeeperTwoAddress = "0xC88Ae7Ca2273F6bc5174F6375812f30E3f488E44";
  const gateKeeperTwo: GatekeeperTwo = await ethers.getContractAt(
    "GatekeeperTwo",
    gateKeeperTwoAddress
  );

  console.log(`🔍 Checking mission status...`);
  await checkMissionStatus(gateKeeperTwo, await deployer.getAddress());
};

main().catch(error => {
  console.error('🚫', error);
});
