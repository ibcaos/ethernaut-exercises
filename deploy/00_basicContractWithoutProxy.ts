import { BigNumber } from "ethers";
import { run, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BasicContractWithoutProxy } from "../typechain";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const basicContractWithoutProxy = await deploy("BasicContractWithoutProxy", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 10,
  });

  console.log("BasicContractWithoutProxy deployed at: ", basicContractWithoutProxy.address);

  await run("verify:verify", {
    address: basicContractWithoutProxy.address,
    contract: "contracts/BasicContractWithoutProxy.sol:BasicContractWithoutProxy",
  });
};

deploy.tags = ["BasicContractWithoutProxy"];
export default deploy;
