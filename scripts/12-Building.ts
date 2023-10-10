import { deployments, ethers } from "hardhat";
import { BigNumber, Contract } from "ethers";
import { Address, Deployment } from "hardhat-deploy/types";
import { Building, Elevator } from "../typechain-types";


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async (): Promise<void> => {
  const elevatorAddress = "0xC394D3451c290f1270604041Bb0dB6cD56693838";
  const elevator: Elevator = await ethers.getContractAt("Elevator", elevatorAddress);
  const buildingDeployment: Deployment = await deployments.get("Building");
  const building: Building = await ethers.getContractAt("Building", buildingDeployment.address);


  await building.goTo();
  await delay(5000);
  console.log(`Are we on the Top?? ${await elevator.top()}`);

};

main();
