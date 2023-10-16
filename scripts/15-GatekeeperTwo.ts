import { deployments, ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Deployment } from "hardhat-deploy/types";
import { AttackGateKeeperTwo, GatekeeperTwo } from "../typechain-types";

const GAS: BigNumber = BigNumber.from("81910");
const OFFSET_GAS: BigNumber = BigNumber.from("450");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const checkMissionStatus = async (
  gateKeeperOne: GatekeeperTwo,
  deployerAddress: string
) => {
  const isMissionAccomplished =
    (await gateKeeperOne.entrant()) === deployerAddress;
  console.log(`Mission Accomplished: ${isMissionAccomplished}`);
};

const main = async (): Promise<void> => {
  const [deployer] = await ethers.getSigners();
  const gateKeeperTwoAddress = "0xC88Ae7Ca2273F6bc5174F6375812f30E3f488E44";
  const gateKeeperTwo: GatekeeperTwo = await ethers.getContractAt(
    "GatekeeperTwo",
    gateKeeperTwoAddress
  );

  checkMissionStatus(gateKeeperTwo, await deployer.getAddress());
};

main();
