import { deployments, ethers } from "hardhat";
import { Deployment } from "hardhat-deploy/types";
import { Contract } from "ethers";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
    const basicContractWithProxy: Deployment = await deployments.get("BasicContractWithProxy");
    const basicContractWithProxyContract: Contract = await ethers.getContractAt("BasicContractWithProxy", basicContractWithProxy.address);

    const basicContractWithoutProxy: Deployment = await deployments.get("BasicContractWithoutProxy");
    const basicContractWithoutProxyContract: Contract = await ethers.getContractAt("BasicContractWithoutProxy", basicContractWithProxy.address);
}

main();
