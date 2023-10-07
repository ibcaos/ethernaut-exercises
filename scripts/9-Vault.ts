import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";
import { Vault } from "../typechain-types";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {

    const [deployer] = await ethers.getSigners();
    const vaultAddress: Address = "0xc7f5ac3A02A806CbEF9D9E4494228d3D3444F61e";
    const vault: Vault = await ethers.getContractAt("Vault", vaultAddress, deployer);

    const password: string = await ethers.provider.getStorageAt(vaultAddress, 1);
    console.log(`Unlocked status: ${await vault.locked()}`);
    await vault.unlock(password);
    await delay(5000);
    console.log(`Unlocked status: ${await vault.locked()}`);

    
    
}

main();
